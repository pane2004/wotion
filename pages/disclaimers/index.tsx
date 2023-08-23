export default function disclaimer() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, 50%)",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "50%",
        }}
      >
        <b>Disclaimer of Affiliation:</b> <br />
        <br />
        Wotion, accessible via the domain Wotion.co, is an independently
        operated application. It is not associated with, endorsed by, or in any
        way affiliated with Notion or any of its subsidiaries or its affiliates.
        The official Notion website can be found at{" "}
        <a href="https://notion.so" target="_blank" rel="noopener noreferrer">
          Notion.so
        </a>
        . The use of any trade name or trademark is for identification and
        reference purposes only and does not imply any association with the
        trademark holder of their product brand. By using this application,
        users acknowledge and agree that Wotion and its operators have no
        affiliation with Notion and that any perceived connection is
        coincidental.
        <br /><br />
        <b>Liability Disclaimer:</b> <br /><br />
        The operators and creators of Wotion are not liable for any damages,
        losses, or issues arising from the use of this application, including,
        but not limited to, indirect, incidental, punitive, and consequential
        damages. Users agree to use this application at their own risk.
      </div>
    </div>
  );
}
