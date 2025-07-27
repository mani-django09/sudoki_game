import React from 'react';

function PrivacyPolicy() {
  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
      background: '#f5f5f5',
      minHeight: '100vh',
      color: '#333'
    }}>
      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #e0e0e0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          height: '55px'
        }}>
          <div style={{
            background: '#4CAF50',
            color: 'white',
            padding: '8px 14px',
            borderRadius: '4px',
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            Sudoku.com
          </div>
          <nav style={{ marginLeft: '30px' }}>
            <a href="/" style={{
              color: '#666',
              textDecoration: 'none',
              fontSize: '14px',
              marginRight: '20px'
            }}>← Back to Game</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div style={{
        maxWidth: '800px',
        margin: '40px auto',
        padding: '0 20px'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '10px',
            color: '#333'
          }}>Privacy Policy</h1>
          
          <p style={{
            color: '#666',
            fontSize: '14px',
            marginBottom: '30px'
          }}>
            Last updated: December 2024
          </p>

          <div style={{
            fontSize: '16px',
            lineHeight: '1.7',
            color: '#555'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginTop: '30px',
              marginBottom: '15px',
              color: '#333'
            }}>1. Introduction</h2>
            <p style={{ marginBottom: '20px' }}>
              Welcome to Sudoku.com ("we," "our," or "us"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our Sudoku gaming services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>

            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginTop: '30px',
              marginBottom: '15px',
              color: '#333'
            }}>2. Information We Collect</h2>
            
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginTop: '25px',
              marginBottom: '15px',
              color: '#333'
            }}>2.1 Information You Provide</h3>
            <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
              <li style={{ marginBottom: '10px' }}>Account registration information (username, email, password)</li>
              <li style={{ marginBottom: '10px' }}>Game statistics and preferences</li>
              <li style={{ marginBottom: '10px' }}>Communication with customer support</li>
              <li style={{ marginBottom: '10px' }}>Survey responses and feedback</li>
            </ul>

            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginTop: '25px',
              marginBottom: '15px',
              color: '#333'
            }}>2.2 Automatically Collected Information</h3>
            <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
              <li style={{ marginBottom: '10px' }}>IP address and location data</li>
              <li style={{ marginBottom: '10px' }}>Browser type and version</li>
              <li style={{ marginBottom: '10px' }}>Device information and operating system</li>
              <li style={{ marginBottom: '10px' }}>Game play data and statistics</li>
              <li style={{ marginBottom: '10px' }}>Cookies and similar tracking technologies</li>
            </ul>

            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginTop: '30px',
              marginBottom: '15px',
              color: '#333'
            }}>3. How We Use Your Information</h2>
            <p style={{ marginBottom: '15px' }}>We use the information we collect to:</p>
            <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
              <li style={{ marginBottom: '10px' }}>Provide, operate, and maintain our Sudoku gaming service</li>
              <li style={{ marginBottom: '10px' }}>Improve and personalize your gaming experience</li>
              <li style={{ marginBottom: '10px' }}>Track game progress and maintain leaderboards</li>
              <li style={{ marginBottom: '10px' }}>Send you updates about new features and tournaments</li>
              <li style={{ marginBottom: '10px' }}>Respond to customer service requests</li>
              <li style={{ marginBottom: '10px' }}>Analyze usage patterns to improve our services</li>
              <li style={{ marginBottom: '10px' }}>Detect and prevent fraud or abuse</li>
            </ul>

            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginTop: '30px',
              marginBottom: '15px',
              color: '#333'
            }}>4. Information Sharing and Disclosure</h2>
            <p style={{ marginBottom: '15px' }}>We may share your information in the following situations:</p>
            <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
              <li style={{ marginBottom: '10px' }}>With your consent or at your direction</li>
              <li style={{ marginBottom: '10px' }}>With service providers who assist in our operations</li>
              <li style={{ marginBottom: '10px' }}>For legal compliance or to protect our rights</li>
              <li style={{ marginBottom: '10px' }}>In connection with a business transfer or merger</li>
              <li style={{ marginBottom: '10px' }}>Aggregated or anonymized data for analytics</li>
            </ul>

            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginTop: '30px',
              marginBottom: '15px',
              color: '#333'
            }}>5. Cookies and Tracking Technologies</h2>
            <p style={{ marginBottom: '20px' }}>
              We use cookies and similar tracking technologies to enhance your experience on our website. These technologies help us remember your preferences, analyze site traffic, and provide personalized content. You can control cookie settings through your browser preferences.
            </p>

            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginTop: '30px',
              marginBottom: '15px',
              color: '#333'
            }}>6. Data Security</h2>
            <p style={{ marginBottom: '20px' }}>
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>

            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginTop: '30px',
              marginBottom: '15px',
              color: '#333'
            }}>7. Your Privacy Rights</h2>
            <p style={{ marginBottom: '15px' }}>Depending on your location, you may have the following rights:</p>
            <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
              <li style={{ marginBottom: '10px' }}>Access to your personal information</li>
              <li style={{ marginBottom: '10px' }}>Correction of inaccurate data</li>
              <li style={{ marginBottom: '10px' }}>Deletion of your personal information</li>
              <li style={{ marginBottom: '10px' }}>Data portability</li>
              <li style={{ marginBottom: '10px' }}>Opt-out of marketing communications</li>
            </ul>

            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginTop: '30px',
              marginBottom: '15px',
              color: '#333'
            }}>8. Children's Privacy</h2>
            <p style={{ marginBottom: '20px' }}>
              Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us immediately.
            </p>

            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginTop: '30px',
              marginBottom: '15px',
              color: '#333'
            }}>9. International Data Transfers</h2>
            <p style={{ marginBottom: '20px' }}>
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your personal information in accordance with applicable data protection laws.
            </p>

            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginTop: '30px',
              marginBottom: '15px',
              color: '#333'
            }}>10. Changes to This Privacy Policy</h2>
            <p style={{ marginBottom: '20px' }}>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of our service after any modifications constitutes acceptance of the updated Privacy Policy.
            </p>

            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginTop: '30px',
              marginBottom: '15px',
              color: '#333'
            }}>11. Contact Us</h2>
            <p style={{ marginBottom: '10px' }}>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div style={{
              background: '#f8f9fa',
              padding: '20px',
              borderRadius: '8px',
              marginTop: '15px'
            }}>
              <p style={{ margin: '5px 0' }}><strong>Email:</strong> privacy@sudoku.com</p>
              <p style={{ margin: '5px 0' }}><strong>Address:</strong> Sudoku.com Privacy Team</p>
              <p style={{ margin: '5px 0' }}>123 Gaming Street, Tech City, TC 12345</p>
              <p style={{ margin: '5px 0' }}><strong>Phone:</strong> +1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;