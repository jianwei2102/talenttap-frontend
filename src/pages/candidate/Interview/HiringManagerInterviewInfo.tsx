import React from 'react';


const HiringManagerInterviewInfo = () => {
    return (
        <div>
            <h1>Congratulations for passing the previous stage!</h1>
            <p>Our hiring manager would like to know more about you. This is an important part of our recruitment process and will help us understand your skills and fit for the role.</p>

            <h4 className='mt-8'>Here's what you need to know before you start:</h4>

            <h5 className='mt-8'>Interview Overview:</h5>
            <ul>
                <li>The interview should take approximately 60 minutes to complete.</li>
                <li>This interview is a two-way communication between Hilti and you.</li>
            </ul>

            <h5 className='mt-8'>Tips for Success:</h5>
            <ul>
                <li>Prepare some behavioural questions before the interview.</li>
                <li>Be confident and articulate.</li>
            </ul>

            <h5 className='mt-8'>Privacy and Data Use:</h5>
            <ul>
                <li>The interview will be recorded and kept confidential and used only for assessing your suitability for the role.</li>
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

export default HiringManagerInterviewInfo;