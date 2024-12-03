import React from "react";
import "./TermsAndConditions.css";
import { useNavigate } from "react-router-dom";

function TermsAndConditions() {
  const navigate = useNavigate();

  const backToWherever = () => {
    navigate(-1);
  };

  return (
    <div className="terms-container">
      <button className="back-to-register-btn" onClick={backToWherever}>
        Back
      </button>
      <h1 className="terms-title">Terms & Conditions - Greywood Hotel</h1>

      <section className="terms-section">
        <h2 className="terms-subtitle">1. Booking & Reservations</h2>
        <p className="terms-text">
          By confirming a reservation with Greywood Hotel, you agree to all
          terms and policies outlined herein. Reservations are subject to
          availability and are only confirmed once payment is received. We
          recommend early bookings for peak seasons.
          <br />
          <br />
          You must provide valid identification at the time of check-in, and the
          name on the reservation must match the identification. Any requests
          for changes to reservations must be made at least 24 hours prior to
          the scheduled check-in.
        </p>
      </section>

      <section className="terms-section">
        <h2 className="terms-subtitle">2. Payment Policies</h2>
        <p className="terms-text">
          Payments must be completed upon booking to secure your reservation. We
          accept major credit cards, PayPal, and bank transfers. All payments
          will be processed in the local currency, and any applicable fees are
          the guest's responsibility.
          <br />
          <br />
          Please note that a security deposit may be required upon check-in,
          which will be refunded at check-out, subject to room condition and
          adherence to hotel policies.
        </p>
      </section>

      <section className="terms-section">
        <h2 className="terms-subtitle">3. Cancellations & Refunds</h2>
        <p className="terms-text">
          Cancellations made more than 48 hours before check-in are eligible for
          a full refund. For cancellations within 48 hours, a cancellation fee
          equivalent to the first night's stay applies. Refunds may take 5-7
          business days to process.
          <br />
          <br />
          In the event of a no-show, the entire reservation amount will be
          charged. We recommend purchasing travel insurance to cover unforeseen
          circumstances.
        </p>
      </section>

      <section className="terms-section">
        <h2 className="terms-subtitle">4. Check-in & Check-out</h2>
        <p className="terms-text">
          Check-in is available from 3:00 PM, and check-out is by 11:00 AM. Late
          check-out requests may incur additional fees. Please contact the front
          desk if you require a late check-out.
          <br />
          <br />
          Guests arriving before check-in time may store their luggage at the
          front desk until their room is ready.
        </p>
      </section>

      <section className="terms-section">
        <h2 className="terms-subtitle">5. Hotel Policies</h2>
        <p className="terms-text">
          Guests are required to follow all hotel policies regarding noise,
          smoking, and pet policies. Smoking is prohibited in all guest rooms
          and public areas. A cleaning fee will be applied if smoking is
          detected.
          <br />
          <br />
          Pets are allowed in designated pet-friendly rooms only, subject to
          availability and a non-refundable pet fee. Guests are responsible for
          cleaning up after their pets and ensuring they do not disturb other
          guests.
        </p>
      </section>

      <section className="terms-section">
        <h2 className="terms-subtitle">6. Damage & Liability</h2>
        <p className="terms-text">
          Guests are responsible for any damage to hotel property. Charges for
          damage will be applied to the guest's account. Greywood Hotel is not
          liable for any loss or damage to personal belongings left unattended.
          <br />
          <br />
          The hotel is not responsible for any injuries incurred on hotel
          property due to negligence or intentional misconduct. Guests are
          advised to use caution in all areas of the hotel.
        </p>
      </section>

      <section className="terms-section">
        <h2 className="terms-subtitle">7. Privacy Policy</h2>
        <p className="terms-text">
          Guest information is confidential and protected in accordance with our
          Privacy Policy. We do not share personal information with third
          parties except as required by law or to provide services requested by
          the guest.
          <br />
          <br />
          Guests may opt out of marketing communications at any time by
          contacting our customer service department.
        </p>
      </section>

      <section className="terms-section">
        <h2 className="terms-subtitle">8. Right to Refuse Service</h2>
        <p className="terms-text">
          Greywood Hotel reserves the right to refuse service to any guest
          acting inappropriately, in violation of hotel policies, or displaying
          disruptive behavior.
          <br />
          <br />
          Management reserves the right to terminate the stay of any guest who
          violates hotel policies, without refund.
        </p>
      </section>

      <section className="terms-section">
        <h2 className="terms-subtitle">9. Governing Law</h2>
        <p className="terms-text">
          These terms and conditions are governed by and construed in accordance
          with the laws of the jurisdiction in which Greywood Hotel is located.
          Any disputes arising from these terms shall be resolved in the
          appropriate courts of that jurisdiction.
        </p>
      </section>

      <section className="terms-section">
        <h2 className="terms-subtitle">10. Changes to Terms</h2>
        <p className="terms-text">
          Greywood Hotel reserves the right to modify these terms and conditions
          at any time. Any changes will be effective immediately upon posting on
          our website. It is the guest's responsibility to review the terms
          periodically to remain informed of any updates.
        </p>
      </section>

      <section className="terms-section">
        <h2 className="terms-subtitle">11. Guest Responsibilities</h2>
        <p className="terms-text">
          Guests are expected to conduct themselves in a manner that does not
          disrupt the comfort or safety of other guests or hotel staff.
          <br />
          <br />
          Violent or threatening behavior will not be tolerated and may result
          in immediate eviction from the premises without refund.
        </p>
      </section>

      <section className="terms-section">
        <h2 className="terms-subtitle">12. Accessibility</h2>
        <p className="terms-text">
          Greywood Hotel is committed to providing a welcoming environment for
          all guests. We offer accessible rooms and facilities, and we strive to
          accommodate the needs of guests with disabilities.
          <br />
          <br />
          Please contact our reservations team for specific requests or
          accommodations required during your stay.
        </p>
      </section>

      <section className="terms-section">
        <h2 className="terms-subtitle">13. Third-Party Services</h2>
        <p className="terms-text">
          Greywood Hotel may partner with third-party vendors to provide
          services such as transportation, spa services, and guided tours.
          <br />
          <br />
          The hotel is not responsible for the quality or availability of these
          services and any issues arising from the use of third-party services.
        </p>
      </section>

      <footer className="terms-footer">
        <p className="terms-footer-text">
          For any questions regarding these terms, please contact Greywood
          Hotel's customer service team.
        </p>
        <p className="terms-footer-text">
          Thank you for choosing Greywood Hotel. We look forward to your stay.
        </p>
      </footer>
    </div>
  );
}

export default TermsAndConditions;
