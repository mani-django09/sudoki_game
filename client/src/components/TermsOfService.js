import React from 'react';

function TermsOfService() {
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
          }}>Terms of Service</h1>
          
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
            }}>1. Acceptance of Terms</h2>
            <p style={{ marginBottom: '20px' }}>
              Welcome to Sudoku.com. These Terms of Service ("Terms") govern your use of our website and gaming services. By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the service.
            </p>

            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginTop: '30px',
              marginBottom: '15px',
              color: '#333'
            }}>2. Description of Service</h2>
            <p style={{ marginBottom: '20px' }}>
              Sudoku.com provides online Sudoku puzzle games and related services. Our service includes various difficulty levels, tournaments, daily challenges, and social features. We reserve the right to modify, suspend, or discontinue any part of our service at any time.
            </p>

            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginTop: '30px',
              marginBottom: '15px',
              color: '#333'
            }}>3. User Accounts and Registration</h2>
            
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginTop: '25px',
              marginBottom: '15px',
              color: '#333'
            }}>3.1 Account Creation</h3>
            <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
              <li style={{ marginBottom: '10px' }}>You must provide accurate and complete information</li>
              <li style={{ marginBottom: '10px' }}>You are responsible for maintaining account security</li>
              <li style={{ marginBottom: '10px' }}>You must be at least 13 years old to create an account</li>
              <li style={{ marginBottom: '10px' }}>One account per person is allowed</li>
            </ul>

            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginTop: '25px',
              marginBottom: '15px',
              color: '#333'
            }}>3.2 Account Responsibilities</h3>
            <p style={{ marginBottom: '20px' }}>
              You are solely responsible for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account or any other breach of security.
            </p>

            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginTop: '30px',
              marginBottom: '15px',
              color: '#333'
            }}>4. Acceptable Use Policy</h2>
            
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginTop: '25px',
              marginBottom: '15px',
              color: '#333'
            }}>4.1 Permitted Uses</h3>
            <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
              <li style={{ marginBottom: '10px' }}>Playing Sudoku puzzles for personal entertainment</li>
              <li style={{ marginBottom: '10px' }}>Participating in tournaments and challenges</li>
              <li style={{ marginBottom: '10px' }}>Sharing your achievements on social media</li>
              <li style={{ marginBottom: '10px' }}>Providing feedback and suggestions</li>
            </ul>

            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginTop: '25px',
              marginBottom: '15px',
              color: '#333'
            }}>4.2 Prohibited Activities</h3>
            <p style={{ marginBottom: '15px' }}>You agree not to:</p>
            <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
              <li style={{ marginBottom: '10px' }}>Use automated tools, bots, or cheating software</li>
              <li style={{ marginBottom: '10px' }}>Attempt to reverse engineer our games or services</li>
              <li style={{ marginBottom: '10px' }}>Harass, abuse, or harm other users</li>
              <li style={{ marginBottom: '10px' }}>Violate any applicable laws or regulations</li>
              <li style={{ marginBottom: '10px' }}>Distribute malware or engage in harmful activities</li>
              <li style={{ marginBottom: '10px' }}>Create multiple accounts to gain unfair advantages</li>
              <li style={{ marginBottom: '10px' }}>Share, sell, or transfer your account</li>
            </ul>

            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginTop: '30px',
              marginBottom: '15px',
              color: '#333'
            }}>5. Intellectual Property Rights</h2>
            
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginTop: '25px',
              marginBottom: '15px',
              color: '#333'
            }}>5.1 Our Content</h3>
            <p style={{ marginBottom: '20px' }}>
              All content on Sudoku.com, including but not limited to games, graphics, logos, text, and software, is owned by us or our licensors and is protected by copyright, trademark, and other intellectual property laws.
            </p>

            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginTop: '25px',
              marginBottom: '15px',
              color: '#333'
            }}>5.2 User Content</h3>
            <p style={{ marginBottom: '20px' }}>
              By submitting content to our service (such as comments or feedback), you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and distribute such content in connection with our service.
            </p>

            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginTop: '30px',
              marginBottom: '15px',
              color: '#333'
            }}>6. Premium Services and Payments</h2>
            
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginTop: '25px',
              marginBottom: '15px',
              color: '#333'
            }}>6.1 Premium Features</h3>
            <p style={{ marginBottom: '20px' }}>
              We may offer premium features for a fee. Premium subscriptions automatically renew unless cancelled. You can cancel your subscription at any time through your account settings.
            </p>

            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginTop: '25px',
              marginBottom: '15px',
              color: '#333'
            }}>6.2 Refund Policy</h3>
            <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
              <li style={{ marginBottom: '10px' }}>All sales are final unless otherwise required by law</li>
              <li style={{ marginBottom: '10px' }}>Refunds may be provided for technical issues within 7 days</li>
              <li style={{ marginBottom: '10px' }}>Subscription cancellations take effect at the end of the billing period</li>
            </ul>

            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginTop: '30px',
              marginBottom: '15px',
              color: '#333'
            }}>7. Privacy and Data Protection</h2>
            <p style={{ marginBottom: '20px' }}>
              Your privacy is important to us. Please review our Privacy Policy, which describes how we collect, use, and protect your information. By using our service, you consent to the collection and use of information as described in our Privacy Policy.
            </p>

            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginTop: '30px',
              marginBottom: '15px',
              color: '#333'
            }}>8. Disclaimers and Limitation of Liability</h2>
            
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginTop: '25px',
              marginBottom: '15px',
              color: '#333'
            }}>8.1 Service Availability</h3>
            <p style={{ marginBottom: '20px' }}>
              We strive to provide continuous service but cannot guarantee 100% uptime. Our service is provided "as is" without warranties of any kind, either express or implied.
            </p>

            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginTop: '25px',
              marginBottom: '15px',
              color: '#333'
            }}>8.2 Limitation of Liability</h3>
            <p style={{ marginBottom: '20px' }}>
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, or other intangible losses.
            </p>

            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginTop: '30px',
              marginBottom: '15px',
              color: '#333'
            }}>9. Termination</h2>
            
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginTop: '25px',
              marginBottom: '15px',
              color: '#333'
            }}>9.1 Termination by You</h3>
            <p style={{ marginBottom: '20px' }}>
              You may terminate your account at any time by contacting customer support or using the account deletion feature in your settings.
            </p>

            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginTop: '25px',
              marginBottom: '15px',
              color: '#333'
            }}>9.2 Termination by Us</h3>
            <p style={{ marginBottom: '20px' }}>
              We may terminate or suspend your account immediately if you violate these Terms or engage in prohibited activities. Upon termination, your right to use the service ceases immediately.
            </p>

            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginTop: '30px',
              marginBottom: '15px',
              color: '#333'
            }}>10. Governing Law and Dispute Resolution</h2>
            <p style={{ marginBottom: '20px' }}>
              These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes arising under these Terms shall be resolved through binding arbitration in accordance with the rules of [Arbitration Organization].
            </p>

            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginTop: '30px',
              marginBottom: '15px',
              color: '#333'
            }}>11. Changes to Terms</h2>
            <p style={{ marginBottom: '20px' }}>
              We reserve the right to modify these Terms at any time. We will notify users of material changes via email or through our service. Your continued use of the service after such changes constitutes acceptance of the new Terms.
            </p>

            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginTop: '30px',
              marginBottom: '15px',
              color: '#333'
            }}>12. Contact Information</h2>
            <p style={{ marginBottom: '10px' }}>
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div style={{
              background: '#f8f9fa',
              padding: '20px',
              borderRadius: '8px',
              marginTop: '15px'
            }}>
              <p style={{ margin: '5px 0' }}><strong>Email:</strong> legal@sudoku.com</p>
              <p style={{ margin: '5px 0' }}><strong>Address:</strong> Sudoku.com Legal Department</p>
              <p style={{ margin: '5px 0' }}>123 Gaming Street, Tech City, TC 12345</p>
              <p style={{ margin: '5px 0' }}><strong>Phone:</strong> +1 (555) 123-4567</p>
            </div>

            <div style={{
              marginTop: '30px',
              padding: '20px',
              background: '#e8f5e8',
              borderRadius: '8px',
              borderLeft: '4px solid #4CAF50'
            }}>
              <p style={{ margin: 0, fontStyle: 'italic' }}>
                <strong>Note:</strong> By clicking "I Agree" or by using our service, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsOfService;