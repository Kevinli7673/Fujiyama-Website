import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "react-email";
import * as React from "react";

export type ReservationStatusEmailProps = {
  status: "approved" | "declined";
  date: string;
  time: string;
  partySize: string;
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <Text
      className="email-ink"
      style={{ margin: "4px 0", fontSize: "14px", color: "#1c1917" }}
    >
      <strong>{label}:</strong> {value}
    </Text>
  );
}

export default function ReservationStatusEmail({
  status,
  date,
  time,
  partySize,
}: ReservationStatusEmailProps) {
  const guests = partySize === "1" ? "1 guest" : `${partySize} guests`;
  const approved = status === "approved";
  const heading = approved ? "Reservation Confirmed" : "Reservation Update";
  const message = approved
    ? "Your reservation has been confirmed. We look forward to seeing you!"
    : "Unfortunately we're unable to accommodate this reservation request. Please call us if you'd like to find another time.";

  return (
    <Html>
      <Head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
        <style>{`
          :root { color-scheme: light; supported-color-schemes: light; }
          @media only screen and (max-width: 480px) {
            .email-container { padding: 20px !important; margin: 16px auto !important; }
          }
          @media (prefers-color-scheme: dark) {
            .email-bg { background-color: #f8f2e7 !important; }
            .email-container { background-color: #ffffff !important; }
            .email-section { background-color: #efe6d7 !important; }
            .email-ink { color: #1c1917 !important; }
            .email-muted { color: #6b6259 !important; }
          }
          [data-ogsc] .email-bg { background-color: #f8f2e7 !important; }
          [data-ogsc] .email-container { background-color: #ffffff !important; }
          [data-ogsc] .email-section { background-color: #efe6d7 !important; }
          [data-ogsc] .email-ink { color: #1c1917 !important; }
          [data-ogsc] .email-muted { color: #6b6259 !important; }
        `}</style>
      </Head>
      <Preview>
        {approved ? "Your reservation is confirmed" : "Update on your reservation request"} — {date} at {time}
      </Preview>
      <Body
        className="email-bg"
        style={{ backgroundColor: "#f8f2e7", fontFamily: "sans-serif", colorScheme: "light" }}
      >
        <div
          className="email-bg"
          style={{ backgroundColor: "#f8f2e7", width: "100%" }}
        >
          <Container
            className="email-container"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "32px",
              margin: "40px auto",
              maxWidth: "480px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
          <Heading
            className="email-ink"
            style={{ fontSize: "20px", color: "#1c1917", margin: "0 0 4px" }}
          >
            {heading}
          </Heading>
          <Text
            className="email-muted"
            style={{ fontSize: "14px", color: "#6b6259", margin: "0 0 20px" }}
          >
            Fujiyama Japanese Steakhouse
          </Text>

          <Text
            className="email-ink"
            style={{ fontSize: "14px", color: "#1c1917", margin: "0 0 20px" }}
          >
            {message}
          </Text>

          <Section
            className="email-section"
            style={{
              backgroundColor: "#efe6d7",
              borderRadius: "12px",
              padding: "16px 20px",
            }}
          >
            <Row label="Date" value={date} />
            <Row label="Time" value={time} />
            <Row label="Party size" value={guests} />
          </Section>

          <Hr style={{ borderColor: "#e3d9c8", margin: "20px 0" }} />

          <Text className="email-muted" style={{ fontSize: "13px", color: "#6b6259", margin: 0 }}>
            Questions? Call us and we&apos;ll be happy to help.
          </Text>
          </Container>
        </div>
      </Body>
    </Html>
  );
}

ReservationStatusEmail.PreviewProps = {
  status: "approved",
  date: "Tuesday, August 18, 2026",
  time: "6:30 PM",
  partySize: "4",
} satisfies ReservationStatusEmailProps;
