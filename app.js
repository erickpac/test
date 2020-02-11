'use strict';

const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi');
const axios = require('axios');
const posts = require('./posts.json');

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return {
                port: 3000,
                appName: 'Test',
                status: 'up'
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/posts',
        handler: async (request, h) => {
            return posts
            // try {
            //     return await axios.get('https://jsonplaceholder.typicode.com/posts')
            // } catch (error) {
            //     console.error(error)
            // }
        }
    });

    server.route({
        method: 'GET',
        path: '/posts/{id}',
        handler: (request, h) => {
            let comments = posts.find(post => post.id == request.params.id);
            return comments
        }
    });

    server.route({
        method: 'POST',
        path: '/posts',
        handler: (request, h) => {
            return {
                message: 'post added'
            }
        },
        options: {
            validate: {
                payload: Joi.object({
                    userId: Joi.number().integer().required(),
                    title: Joi.string().required(),
                    body: Joi.string().required(),
                })
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/posts/{id}/comments',
        handler: (request, h) => {
            return {
                message: 'comment added'
            }
        }
    });

    server.route({
        method: 'PATCH',
        path: '/posts/{id}',
        handler: (request, h) => {
            return {
                message: 'post edited'
            }
        }
    });

    server.route({
        method: 'DELETE',
        path: '/posts/{id}',
        handler: (request, h) => {
            return {
                message: 'post deleted'
            }
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();