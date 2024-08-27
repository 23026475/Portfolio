<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $contact = htmlspecialchars(trim($_POST['contact']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format";
        exit;
    }


    $to = 'ndivhuswiswi@gmail.com'; 

    // Set the email subject.
    $subject = 'Portfolio Contact Form Submission';

    // Build the email content.
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Contact Number: $contact\n\n";
    $email_content .= "Message:\n$message\n";

    // Build the email headers.
    $email_headers = "From: $name <$email>";

    // Send the email.
    if (mail($to, $subject, $email_content, $email_headers)) {
        // Success message
        echo "Thank you! Your message has been sent.";
    } else {
        // Failure message
        echo "Oops! Something went wrong and we couldn't send your message.";
    }
} else {
    header("Location: Contact.html"); 
    exit;
}
?>
