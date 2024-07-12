import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const Booking = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true);

        const templateParams = {
            from_name: name,
            to_name: 'florida@manhattanlaserspa.com',
            Email: email,
            Phone: phone,
            selectedDate: selectedDate,
            selectedTimeSlot: selectedTimeSlot,
            selectedService: selectedService
        };
        

        emailjs.send('service_m1vo1g9', 'template_c6v8mot', templateParams, '6-RJ5whcIHsS0u6_T')
            .then((response) => {
                console.log('Email sent:', response.status, response.text);
                setSuccess(true);
                setLoading(false);
            }, (error) => {
                console.error('Error sending email:', error);
                setError('Error sending email. Please try again later.');
                setLoading(false);
            });
    };

    return (
        <div style={styles.bookingContainer}>
            <h1 style={styles.bookingTitle}>Book an Appointment</h1>
            <form onSubmit={sendEmail} style={styles.bookingForm}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Phone:</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Select a Date:</label>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Select a Time Slot:</label>
                    <input
                        type="time"
                        value={selectedTimeSlot}
                        onChange={(e) => setSelectedTimeSlot(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Select a Service:</label>
                    <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        required
                        style={styles.select}
                    >
                        <option value="">-- Select a service --</option>
                        <option value="Laser Hair Removal">Laser Hair Removal</option>
                        <option value="Body Contouring">Body Contouring</option>
                        <option value="Injectables">Injectables</option>
                        <option value="Permanent Fat Reduction">Permanent Fat Reduction</option>
                        <option value="Skin Analysis">Skin Analysis</option>
                    </select>
                </div>
                <button type="submit" disabled={loading} style={styles.submitButton}>
                    {loading ? 'Sending...' : 'Book Appointment'}
                </button>
            </form>
            {loading && <p style={styles.loadingMessage}>Sending...</p>}
            {error && <p style={styles.errorMessage}>{error}</p>}
            {success && <p style={styles.successMessage}>Email sent successfully!</p>}
        </div>
    );
};

const styles = {
    bookingContainer: {
        maxWidth: '500px',
        margin: '50px auto',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        fontFamily: 'Arial, sans-serif',
    },
    bookingTitle: {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '24px',
        color: '#333',
    },
    bookingForm: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#555',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        boxSizing: 'border-box',
        fontSize: '16px',
    },
    select: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        boxSizing: 'border-box',
        fontSize: '16px',
        cursor: 'pointer',
    },
    submitButton: {
        padding: '12px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s',
    },
    loadingMessage: {
        textAlign: 'center',
        marginTop: '10px',
        color: '#333',
    },
    errorMessage: {
        textAlign: 'center',
        marginTop: '10px',
        color: 'red',
    },
    successMessage: {
        textAlign: 'center',
        marginTop: '10px',
        color: 'green',
    },
};

export default Booking;
