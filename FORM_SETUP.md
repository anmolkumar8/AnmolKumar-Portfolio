# Contact Form Setup Instructions

To make your contact form functional and receive emails at anmolkumarhajipur0@gmail.com, follow these simple steps:

## Option 1: Using Formspree (Recommended)

1. **Go to [Formspree.io](https://formspree.io)**
2. **Sign up** with your email: anmolkumarhajipur0@gmail.com
3. **Create a new form** and copy the form endpoint URL
4. **In your index.html file**, replace:
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   With your actual Formspree endpoint:
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_ACTUAL_FORM_ID" method="POST">
   ```

## Option 2: Using Netlify Forms (If hosting on Netlify)

1. **Add the `data-netlify="true"` attribute** to your form:
   ```html
   <form id="contact-form" data-netlify="true" method="POST">
   ```

## Option 3: Using EmailJS

1. **Go to [EmailJS.com](https://www.emailjs.com/)**
2. **Sign up** and create a service
3. **Add the EmailJS SDK** to your HTML head:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   ```
4. **Update your JavaScript** to use EmailJS instead of the current form handler

## Current Setup

The form is currently set up with a placeholder Formspree URL. Once you replace it with your actual form endpoint, visitors will be able to send messages directly to your email: **anmolkumarhajipur0@gmail.com**

## Testing

After setup, test the contact form by:
1. Filling out the form on your website
2. Submitting it
3. Checking your email for the message

## Note

The form currently includes client-side validation and a notification system that will work with any of the above options.
