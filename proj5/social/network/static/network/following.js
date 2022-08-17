// execution part
document.addEventListener('DOMContentLoaded', () => {
    // get the CSRF token from cookies
    const csrftoken = Cookies.get('csrftoken');
    
    // fetch the posts
    fetch('/get_following_posts')
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw response;
        };
    })
    .then(data => {
        // data is now a list of all serialized posts in JSON format
        data = data.posts;
        console.log('fetch posts');
        // console.log(data);
        // load the initial ten posts
        load_posts(0, data, csrftoken);
        // start from the 11th post
        let start = 10;
        // every time the Next button is clicked, load ten more posts and increment start
        document.querySelector('#load-more-button').onclick = () => {
            load_posts(start, data, csrftoken);
            start += 10;
        };
        // define the new-post form action
        document.querySelector('#new-post-form').onsubmit = () => {
            const title = document.querySelector('new-post-title').value.trim();
            if (title === '') {
                alert('Title cannot be empty.');
            } else {
                const content = document.querySelector('new-post-content').value.trim();
                if (content === '') {
                    alert('Post content cannot be empty.');
                } else {
                    fetch('post_post', {
                        method: 'POST',
                        headers: {
                            'X-CSRFToken': csrftoken,
                        },
                        body: JSON.stringify({
                            title: title,
                            content: content
                        })
                    })
                    .then(response => {
                        if (response.ok) {
                            // if posting is successful, reload the whole page
                            location.reload();
                        } else {
                            throw response;
                        };
                    })
                    .catch(error => {
                        error.json().then(body => {
                            console.log(body.error);
                            alert(body.error);
                        })
                    });
                };
            };
        };
    })
    .catch(error => {
        error.json().then(body => {
            console.log(body.error);
            alert(body.error);
        });
    });
});
