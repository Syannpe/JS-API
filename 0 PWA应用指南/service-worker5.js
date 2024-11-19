self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    clients.claim();
});

self.addEventListener('fetch', (event) => {
    if (event.request.method === 'POST' && event.request.url.endsWith('/share-file-handler')) {
        event.respondWith(handleShareTarget(event.request));
    }
});

async function handleShareTarget(request) {
    const formData = await request.formData();
    const files = [];

    for (let entry of formData.entries()) {
        const [name, value] = entry;
        if (value instanceof File) {
            files.push({
                name: name,
                file: value,
                type: value.type,
                size: value.size,
            });
        }
    }

    await sendFilesToFrontend(files);

    return Response.redirect('./11 处理分享数据.html', 303);
}

async function sendFilesToFrontend(files) {
    const allClients = await clients.matchAll({
        includeUncontrolled: true,
        type: 'window'
    });

    for (const client of allClients) {
        client.postMessage({
            type: 'SHARED_FILES',
            files: files
        });
    }
}