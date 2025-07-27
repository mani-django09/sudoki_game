import React, { useState } from 'react';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: '',
    priority: 'normal'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: '',
        priority: 'normal'
      });
    }, 1500);
  };

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
        maxWidth: '1000px',
        margin: '40px auto',
        padding: '0 20px'
      }}>
        {/* Hero Section */}
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '15px',
            color: '#333'
          }}>Contact Us</h1>
          <p style={{
            fontSize: '18px',
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            We're here to help! Whether you have questions, feedback, or need support, we'd love to hear from you.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px',
          alignItems: 'flex-start'
        }}>
          {/* Contact Form */}
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginBottom: '20px',
              color: '#333'
            }}>Send us a Message</h2>

            {isSubmitted ? (
              <div style={{
                background: '#d4edda',
                border: '1px solid #c3e6cb',
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>✅</div>
                <h3 style={{ color: '#155724', marginBottom: '10px' }}>Message Sent Successfully!</h3>
                <p style={{ color: '#155724', margin: 0 }}>
                  Thank you for contacting us. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  style={{
                    background: '#28a745',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '15px',
                    fontSize: '14px'
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div onSubmit={handleSubmit}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '15px',
                  marginBottom: '15px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '5px',
                      fontWeight: '500',
                      color: '#333'
                    }}>Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '5px',
                      fontWeight: '500',
                      color: '#333'
                    }}>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '15px',
                  marginBottom: '15px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '5px',
                      fontWeight: '500',
                      color: '#333'
                    }}>Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                        backgroundColor: 'white'
                      }}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="bug">Bug Report</option>
                      <option value="feature">Feature Request</option>
                      <option value="account">Account Issues</option>
                      <option value="premium">Premium Subscription</option>
                      <option value="business">Business/Partnership</option>
                      <option value="legal">Legal/DMCA</option>
                    </select>
                  </div>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '5px',
                      fontWeight: '500',
                      color: '#333'
                    }}>Priority</label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                        backgroundColor: 'white'
                      }}
                    >
                      <option value="low">Low</option>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: '500',
                    color: '#333'
                  }}>Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: '500',
                    color: '#333'
                  }}>Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px',
                      resize: 'vertical',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Please provide detailed information about your inquiry..."
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  style={{
                    background: isSubmitting ? '#ccc' : '#2196F3',
                    color: 'white',
                    border: 'none',
                    padding: '14px 30px',
                    borderRadius: '5px',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    fontSize: '16px',
                    fontWeight: '600',
                    width: '100%',
                    transition: 'all 0.3s'
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div>
            {/* Quick Contact */}
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              marginBottom: '20px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '20px',
                color: '#333'
              }}>Get in Touch</h3>

              <div style={{ marginBottom: '20px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px'
                }}>
                  <span style={{
                    fontSize: '20px',
                    marginRight: '12px',
                    width: '30px'
                  }}>📧</span>
                  <div>
                    <div style={{ fontWeight: '500', color: '#333' }}>Email Support</div>
                    <div style={{ color: '#666', fontSize: '14px' }}>support@sudoku.com</div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px'
                }}>
                  <span style={{
                    fontSize: '20px',
                    marginRight: '12px',
                    width: '30px'
                  }}>📞</span>
                  <div>
                    <div style={{ fontWeight: '500', color: '#333' }}>Phone Support</div>
                    <div style={{ color: '#666', fontSize: '14px' }}>+1 (555) 123-4567</div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px'
                }}>
                  <span style={{
                    fontSize: '20px',
                    marginRight: '12px',
                    width: '30px'
                  }}>💬</span>
                  <div>
                    <div style={{ fontWeight: '500', color: '#333' }}>Live Chat</div>
                    <div style={{ color: '#666', fontSize: '14px' }}>Available 24/7</div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <span style={{
                    fontSize: '20px',
                    marginRight: '12px',
                    width: '30px'
                  }}>📍</span>
                  <div>
                    <div style={{ fontWeight: '500', color: '#333' }}>Office Address</div>
                    <div style={{ color: '#666', fontSize: '14px' }}>
                      123 Gaming Street<br />
                      Tech City, TC 12345
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Times */}
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              marginBottom: '20px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '20px',
                color: '#333'
              }}>Response Times</h3>

              <div style={{ marginBottom: '15px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: '1px solid #f0f0f0'
                }}>
                  <span style={{ color: '#666' }}>Email Support</span>
                  <span style={{ fontWeight: '600', color: '#28a745' }}>2-4 hours</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: '1px solid #f0f0f0'
                }}>
                  <span style={{ color: '#666' }}>Live Chat</span>
                  <span style={{ fontWeight: '600', color: '#28a745' }}>Instant</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: '1px solid #f0f0f0'
                }}>
                  <span style={{ color: '#666' }}>Phone Support</span>
                  <span style={{ fontWeight: '600', color: '#ffc107' }}>Business hours</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0'
                }}>
                  <span style={{ color: '#666' }}>Technical Issues</span>
                  <span style={{ fontWeight: '600', color: '#28a745' }}>1-2 hours</span>
                </div>
              </div>
            </div>

            {/* FAQ Link */}
            <div style={{
              background: '#e3f2fd',
              padding: '20px',
              borderRadius: '8px',
              borderLeft: '4px solid #2196F3'
            }}>
              <h4 style={{
                margin: '0 0 10px 0',
                color: '#1565C0',
                fontSize: '16px'
              }}>💡 Need Quick Help?</h4>
              <p style={{
                margin: '0 0 15px 0',
                color: '#1565C0',
                fontSize: '14px'
              }}>
                Check out our FAQ section for instant answers to common questions.
              </p>
              <a href="#" style={{
                color: '#1976D2',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '14px'
              }}>
                Visit FAQ →
              </a>
            </div>
          </div>
        </div>

        {/* Support Categories */}
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          marginTop: '30px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '30px',
            color: '#333',
            textAlign: 'center'
          }}>What can we help you with?</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            {[
              {
                icon: '🎮',
                title: 'Game Support',
                description: 'Issues with gameplay, puzzles, or game features',
                email: 'support@sudoku.com'
              },
              {
                icon: '👤',
                title: 'Account Help',
                description: 'Login issues, account settings, and profile management',
                email: 'accounts@sudoku.com'
              },
              {
                icon: '💳',
                title: 'Billing & Premium',
                description: 'Subscription questions, payments, and premium features',
                email: 'billing@sudoku.com'
              },
              {
                icon: '🔧',
                title: 'Technical Issues',
                description: 'Bugs, performance problems, and technical difficulties',
                email: 'technical@sudoku.com'
              },
              {
                icon: '💼',
                title: 'Business Inquiries',
                description: 'Partnerships, licensing, and business opportunities',
                email: 'business@sudoku.com'
              },
              {
                icon: '⚖️',
                title: 'Legal & DMCA',
                description: 'Copyright claims, legal matters, and compliance',
                email: 'legal@sudoku.com'
              }
            ].map((category, index) => (
              <div key={index} style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'center',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '15px' }}>
                  {category.icon}
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '10px',
                  color: '#333'
                }}>
                  {category.title}
                </h3>
                <p style={{
                  color: '#666',
                  fontSize: '14px',
                  marginBottom: '15px',
                  lineHeight: '1.5'
                }}>
                  {category.description}
                </p>
                <a href={`mailto:${category.email}`} style={{
                  color: '#2196F3',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  {category.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;