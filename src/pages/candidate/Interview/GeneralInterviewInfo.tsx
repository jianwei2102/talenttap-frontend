import React from 'react';


const GeneralInterviewInfo = () => {
    return (
        <div>
            <h1>Congratulations for passing the previous stage!</h1>
            <p>We're excited to get to know you better through this video interview. This is an important part of our recruitment process and will help us understand your skills and fit for the role.</p>

            <h4 className='mt-8'>Here's what you need to know before you start:</h4>

            <h5 className='mt-8'>Assessment Overview:</h5>
            <ul>
                <li>You will be completing all questions.</li>
                <li>The assessment should take approximately 60 minutes to complete.</li>
            </ul>

            <h5 className='mt-8'>Technical Requirements:</h5>
            <ul>
                <li>Ensure you have a stable internet connection.</li>
                <li>Use a compatible browser such as Apple Safari, Google Chrome, and Microsoft Edge.</li>
                <li>Test your setup before starting the to ensure everything is working correctly.</li>
            </ul>

            <h5 className='mt-8'>Preparing Your Environment:</h5>
            <ul>
                <li>Find a quiet place with minimal distractions.</li>
                <li>Make sure your workspace is comfortable and conducive to focusing.</li>
            </ul>

            <h5 className='mt-8'>Completing the Assessment:</h5>
            <ul>
                <li>Read each question/task carefully before starting your answer.</li>
                <li>Aim to be clear and concise in your responses.</li>
                <li>If applicable, you will have the chance to review and revise your answers before final submission.</li>
                <li>Keep an eye on the timer to manage your time effectively.</li>
            </ul>

            <h5 className='mt-8'>Tips for Success:</h5>
            <ul>
                <li>Stay calm and focused throughout the assessment.</li>
                <li>Be confident.</li>
            </ul>

            <h5 className='mt-8'>Privacy and Data Use:</h5>
            <ul>
                <li>Your video recordings will be kept confidential and used only for assessing your suitability for the role.</li>
                <li>Your data will be stored securely for approximately 6-12 months.</li>
                <li>By proceeding, you consent to the recording and use of your assessment responses.</li>
            </ul>

            <div className="contact-info">
                <h5 className='mt-8'>Support and Contact Information:</h5>
                <p>If you encounter any technical issues, please contact our support team at <a href="mailto:talenttap@hilti.com">talenttap@hilti.com</a>.</p>
            </div>

            <p>Thank you for your interest in joining Hilti. Good luck!</p>
        </div>
    );
};

export default GeneralInterviewInfo;