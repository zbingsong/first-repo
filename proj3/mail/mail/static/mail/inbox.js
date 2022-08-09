document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', () => compose_email(false, ''));

  

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email(reply = false, content = '') {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#single-email').style.display = 'none';

  if (reply) {
    console.log('replying');
    document.querySelector('#compose-recipients').value = content.sender;
    document.querySelector('#compose-subject').value = `Re: ${content.subject}`;
    document.querySelector('#compose-body').value = `On ${content.timestamp}, ${content.sender} wrote:\n${content.body}\n-----------------------\n`;
  } else {
    // Clear out composition fields
    document.querySelector('#compose-recipients').value = '';
    document.querySelector('#compose-subject').value = '';
    document.querySelector('#compose-body').value = '';
  }

  // When the form is submitted, send the email
  document.querySelector('#compose-form').onsubmit = () => {
    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
        recipients: document.querySelector('#compose-recipients').value,
        subject: document.querySelector('#compose-subject').value,
        body: document.querySelector('#compose-body').value
      })
    })
    .then(response => response.json())
    .then(result => {
      if (result.status === 400) {
        alert(`${result.error}`);
      } else {
        alert(`${result.message}`);
        load_mailbox('sent');
      };
    });
  };

  return true;
};


function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#single-email').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // Show emails
  // Get emails
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
    // if get an error, display
    if (emails.status === 400) {
      const error_message = document.createElement('div');
      error_message.innerHTML = 'No such mailbox exists!';
      document.querySelector('#emails-view').append(error_message);
    } else {
      // otherwise, create a div that contains the list of emails
      const email_list = document.createElement('div');
      emails.forEach(content => {
        // each list item is a div that contains the sender, subject, and timestamp
        // create the email item container
        let email_container = document.createElement('div');
        email_container.className = 'email-container';
        // Set the background color to distinguish read and unread emails
        if (content.read) {
          email_container.style.background = 'white';
        } else {
          email_container.style.background = 'grey';
        };

        // create the email sender div
        let sender = document.createElement('div');
        sender.innerHTML = content.sender;
        sender.className = 'email-sender';

        // create the email subject div
        let subject = document.createElement('div');
        subject.innerHTML = content.subject.trim();
        sender.className = 'email-subject';
        // if the subject is empty, replace it with '(No Subject)'
        if (subject.innerHTML === '') {
          subject.innerHTML = '(No Subject)'
        };

        let timestamp = document.createElement('div');
        timestamp.innerHTML = content.timestamp;
        sender.className = 'email-timestamp';
        
        // put the three things into the email container
        email_container.append(sender, subject, timestamp);
        // add event listener to the container so that if it is clicked, load the corresponding email
        email_container.addEventListener('click', () => {
          if (mailbox === 'sent') {
            load_email(content.id, false);
          } else {
            load_email(content.id, true);
          };
        });
        // append the container to the list of emails
        email_list.append(email_container);
      });
      // Append the email list to the #emails-view div
      document.querySelector('#emails-view').append(email_list);
    };
  });
};


function load_email(email_id, if_receive) {
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#single-email').style.display = 'block';

  document.querySelector('#view-email-reply').style.display = 'none';
  document.querySelector('#view-email-archive').style.display = 'none';
  document.querySelector('#view-email-unarchive').style.display = 'none';
  
  fetch(`/emails/${email_id}`)
  .then(response => response.json())
  .then(content => {
    if (content.status === 404) {
      document.querySelector('#view-email-from').innerHTML = '';
      document.querySelector('#view-email-to').innerHTML = '';
      document.querySelector('#view-email-subject').innerHTML = '';
      document.querySelector('#view-email-timestamp').innerHTML = '';
      document.querySelector('#view-email-body').innerHTML = content.error;
    } else {
      document.querySelector('#view-email-from').innerHTML = content.sender;
      document.querySelector('#view-email-to').innerHTML = content.recipients.join(', ');
      document.querySelector('#view-email-subject').innerHTML = content.subject;
      document.querySelector('#view-email-timestamp').innerHTML = content.timestamp;
      document.querySelector('#view-email-body').innerHTML = content.body;
      console.log(content);

      if (if_receive) {
        document.querySelector('#view-email-reply').style.display = 'in-line';
        document.querySelector('#view-email-reply').onclick = () => {
          compose_email(true, content);
        };
  
        const unarchive_button = document.querySelector('#view-email-unarchive');
        const archive_button = document.querySelector('#view-email-archive');
        if (content.archived) {
          unarchive_button.style.display = 'in-line';
          unarchive_button.onclick = () => {
            fetch(`/emails/${content.id}`, {
              method: 'PUT',
              body: JSON.stringify({
                archived: false
              })
            });
            load_mailbox('inbox');
          };
        } else {
          archive_button.style.display = 'in-line';
          archive_button.onclick = () => {
            fetch(`/emails/${content.id}`, {
              method: 'PUT',
              body: JSON.stringify({
                archived: true
              })
            });
            load_mailbox('inbox');
          };
        };

        // once the email is opened, change its status to "read"
        fetch(`/emails/${email_id}`, {
          method: 'PUT',
          body: JSON.stringify({
            read: true
          })
        });
      };
    };
  });
};
