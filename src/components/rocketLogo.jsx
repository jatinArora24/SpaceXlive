export default function RocketLogo(props) {
  return (
    <img
      alt="mission patch graphic"
      src={props.url}
      style={{
        backgroundColor: "rgba(218, 177, 218,0.13)",
        height: 120,
        borderRadius: 15,
      }}
    ></img>
  );
}
