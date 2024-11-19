self.addEventListener("message", async function (e) {
    console.log(e.data)
    const {method, value} = e.data
    switch (method) {
        case 'setAppBadge':
            await navigator.setAppBadge(value);
            console.log("setAppBadge")
            break;
        case 'clearAppBadge':
            await navigator.clearAppBadge();
            console.log("clearAppBadge")
            break;
    }
});

self.addEventListener('activate', function () {
    console.log('Service Worker activated.')
});