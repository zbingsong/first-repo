document.addEventListener('DOMContentLoaded', () => {
    fetch('/get_posts')
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Something went wrong. Please try again later.')
        };
    })
    .then(data => {
        data = data.posts;
        let start = 0;
        let end = start + 10;
        const past_posts = document.querySelector('#past-posts');
        for (let i=0; i<end; i++) {
            let post_container = document.createElement('div');
            let post_title = data[i].
            post_container.className = 'container border p-4';
            
        };
    })
    .catch(error => {
        console.log(error);
        alert(error);
    });
});


function add_post(post) {
    let post_container = document.createElement('div');
    post_container.className = 'container border p-4';

    let post_title = document.createElement('h5');
    post_title.innerHTML = post.title;

    let post_author_link = document.createElement('a');
    let post_author = document.createElement('small');
    post_author.innerHTML = post.author;
    post_author.className = 'text-muted';
    post_author_link.append(post_author);
    post_author_link.href = `/profile/${post.author}`;

    let post_content = document.createElement('div');
    post_content.className = 'container text-wrap';
    post_content.style.whiteSpace = 'pre-wrap';
    post_content.style.wordBreak = 'break-word';
    post_content.innerHTML = post.content;

    let post_timestamp = document.createElement('div');
    post_timestamp.className = 'container text-muted';
    post_timestamp.innerHTML = post.timestamp;

    let like_button = document.createElement('div');
    like_button.className = 'heart';
    like_button.onclick = () => {
        fetch(`/get_likes/${post.pk}`, {
            method: 'PUT',
            body: JSON.stringify({
                like: post.if_liked ? -1 : 1
            })
        })
        .then(response => {
            if (response.ok) {
                // change like button color
            } else {
                throw new Error('Something went wrong when you liked the post.')
            }
        })
        .catch(error => {
            console.log(error);
            alert(error);
        });
        post.if_liked = !post.if_liked;
    }

    let post_likes = document.createElement('span');
    post_likes.innerHTML = post.likes;
    post_likes.className = 'text-muted';

    
}

document.querySelector('load-more-button').onclick = () => {

}