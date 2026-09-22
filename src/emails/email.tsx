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

export type ReservationEmailProps = {
  date: string;
  time: string;
  partySize: string;
  email: string;
  phone: string;
  notes?: string;
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

export default function ReservationEmail({
  date,
  time,
  partySize,
  email,
  phone,
  notes,
}: ReservationEmailProps) {
  const guests = partySize === "1" ? "1 guest" : `${partySize} guests`;

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
        New reservation request — {date} at {time}
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
            New Reservation Request
          </Heading>
          <Text
            className="email-muted"
            style={{ fontSize: "14px", color: "#6b6259", margin: "0 0 20px" }}
          >
            Fujiyama Japanese Steakhouse
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

          <Row label="Email" value={email} />
          <Row label="Phone" value={phone} />
          {notes && <Row label="Notes" value={notes} />}
          </Container>
        </div>
      </Body>
    </Html>
  );
}

ReservationEmail.PreviewProps = {
  date: "Tuesday, August 18, 2026",
  time: "6:30 PM",
  partySize: "4",
  email: "guest@example.com",
  phone: "(352) 555-0123",
  notes: "Window seat if possible",
} satisfies ReservationEmailProps;
