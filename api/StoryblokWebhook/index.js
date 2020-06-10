module.exports = async function (context, req) {
    // curl -X POST https://api.github.com/repos/:owner/:repo/dispatches \
    // -H 'Accept: application/vnd.github.everest-preview+json' \
    // -H 'Authorization: token $TOKEN' \
    // --data '{"event_type": "$CUSTOM_ACTION_NAME"}'
    context.log('Process Storyblok Webhook')
    context.log()
    const owner = 'sebgie'
    const repo = 'vue-nuxt-boilerplate'
    const url = `https://api.github.com/repos/${owner}/${repo}/dispatches`
    const requestBody = {
        event_type: 'storyblok_publish'
    }
    const config = {
        headers: {
            'Accept': 'application/vnd.github.everest-preview+json',
            'Authorization': `token ${process.env.GITHUB_TOKEN}`
        }
    }

    axios.post(url, requestBody, config)
        .then((response) => {
            context.log(response)
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: {
                    success: true
                }
            };
        })
        .catch((err) => {
            context.log(err)
            context.res = {
                status: 400,
                body: {
                    success: false
                }
            };
        })
};
