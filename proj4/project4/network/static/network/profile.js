// execution part
document.addEventListener('DOMContentLoaded', () => {
    // get the username from the URL
    const path = location.pathname.split('/');
    // console.log(path);
    const username = path[path.length-1];
    // console.log(username);
    // fetch the posts
    fetch(`/load_profile/${username}`)
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw response
        };
    })
    .then(data => {
        // data is now a list of all serialized posts in JSON format
        let if_follow = data.if_follow;
        data = data.posts;
        console.log('fetch posts');
        console.log(if_follow);
        // console.log(data);
        // load the initial ten posts
        load_posts(0, data);
        // start from the 11th post
        let start = 10;
        // every time the Next button is clicked, load ten more posts and increment start
        document.querySelector('#load-more-button').onclick = () => {
            load_posts(start, data);
            start += 10;
        };

        // select the follow and unfollow buttons
        const unfollow_button = document.querySelector('#unfollow');
        const follow_button = document.querySelector('#follow');
        // decide which button to show; if if_follow === -1, show neither (default)
        if (if_follow === 1) {
            unfollow_button.style.display = 'block';
            // follow_button.style.display = 'none';
        } else if (if_follow === 0) {
            // unfollow_button.style.display = 'none';
            follow_button.style.display = 'block';
        };
        // define unfollow button action
        unfollow_button.onclick = () => {
            fetch(`/change_follow/${username}`, {
                method: 'PUT',
                body: JSON.stringify({
                    if_follow: true
                })
            })
            .then(response => {
                if (response.ok) {
                    follow_button.style.display = 'block';
                    unfollow_button.style.display = 'none';
                    if_follow = false;
                } else {
                    throw response;
                };
            })
            .catch(error => {
                error.json().then(body => {
                    console.log(body.error);
                    alert(body.error);
                    if (error.status === 401) {
                        location.replace('/login');
                    };
                })
            });
        };
        // define follow button action
        follow_button.onclick = () => {
            fetch(`/change_follow/${username}`, {
                method: 'PUT',
                body: JSON.stringify({
                    if_follow: false
                })
            })
            .then(response => {
                if (response.ok) {
                    follow_button.style.display = 'none';
                    unfollow_button.style.display = 'block';
                    if_follow = true;
                } else {
                    throw response;
                };
            })
            .catch(error => {
                error.json().then(body => {
                    console.log(body.error);
                    alert(body.error);
                    if (error.status === 401) {
                        location.replace('/login');
                    };
                })
            });
        };
    })
    .catch(error => {
        error.json().then(body => {
            console.log(body.error);
            alert(body.error);
        });
    });
});
