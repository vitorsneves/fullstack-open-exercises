import StatisticsLine from "../StatisticsLine";

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  let average = 0;
  let positivePercentage = 0;

  if (total !== 0) {
    average = (good - bad) / total;
    positivePercentage = (good / total) * 100;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>statistics</th>
        </tr>
      </thead>
      <tbody>
        {total === 0 ? (
          <tr>
            <td>No feedback given</td>
          </tr>
        ) : (
          <>
            <StatisticsLine text="good" value={good} />
            <StatisticsLine text="neutral" value={neutral} />
            <StatisticsLine text="bad" value={bad} />
            <StatisticsLine text="average" value={average.toFixed(2)} />
            <StatisticsLine
              text="positive"
              value={positivePercentage.toFixed(2).concat(" %")}
            />
          </>
        )}
      </tbody>
    </table>
  );
};

export default Statistics;
