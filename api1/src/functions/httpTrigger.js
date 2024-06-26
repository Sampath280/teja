const { app } = require('@azure/functions');

app.http('httpTrigger', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const name = request.query.get('name') || await request.text() || 'world';

        // Example success response
        const successResponse = {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                message: `message ${new Date().toString()} sent` 
            })
        };

        // Example failure response
        const failureResponse = {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                error: 'Bad Request', 
                message: 'Invalid input' 
            })
        };

        // Logic to determine success or failure (for demonstration purposes)
        if (name !== 'world') {
            return successResponse;
        } else {
            return failureResponse;
        }
    }
});
