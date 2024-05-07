const HourList = ({ hourList }) => {
  return hourList.map((hour, index) => (
    <p key={index}>
      {hour.days}: {hour.open}-{hour.close}
    </p>
  ));
};

export default HourList;
