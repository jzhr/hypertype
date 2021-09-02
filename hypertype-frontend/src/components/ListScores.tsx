function ListScores({ scores }: any) {
  return (
    <ul>
      {scores && scores.length > 0 ? (
        scores.map((score: any) => {
          return <li key={score._id}>{score.score} cpm</li>;
        })
      ) : (
        <li>No scores available</li>
      )}
    </ul>
  );
}

export default ListScores;
