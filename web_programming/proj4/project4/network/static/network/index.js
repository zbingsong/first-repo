// execution part
document.addEventListener('DOMContentLoaded', () => {
    // fetch the posts
    fetch('/get_posts')
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw response;
            // throw new Error();
        };
    })
    .then(data => {
        // data is now a list of all serialized posts in JSON format
        data = data.posts;
        console.log('fetch posts');
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
        // define the new-post form action
        document.querySelector('#new-post-form').onsubmit = (event) => {
            // alert('client side check');
            event.preventDefault();
            const title = document.querySelector('#new-post-title').value.trim();
            if (title === '') {
                alert('Title cannot be empty.');
            } else {
                // alert('title check passed');
                const content = document.querySelector('#new-post-content').value.trim();
                if (content === '') {
                    alert('Post content cannot be empty.');
                } else {
                    // alert('post check passed');
                    console.log(Cookies.get('csrftoken'));
                    fetch('/post_post', {
                        method: 'POST',
                        body: JSON.stringify({
                            title: title,
                            content: content
                        })
                    })
                    .then(response => {
                        // alert('success');
                        if (response.ok) {
                            // alert('success');
                            console.log('posting succeeded');
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
                            if (error.status === 401) {
                                location.replace('/login');
                            };
                        });
                    });
                };
            };
        };
    })
    .catch(error => {
        console.log(error);
        error.json().then(body => {
            console.log(body.error);
            alert(body.error);
        });
    });
});
