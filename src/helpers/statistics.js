export const statisticsChart = (movies) => {
  const years = movies.map((movie) => movie.year);
  const nominations = movies.map((movie) => movie.oscar_nominations);
  const wins = movies.map((movie) => movie.oscar_winning);
  const titles = movies.map((movie) => movie.title);

  const chartData = {
    labels: years,
    datasets: [
      {
        label: "Oscar Nominations",
        data: nominations,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Oscar Wins",
        data: wins,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return { chartData, titles };
};

export const statisticsOptions = (chartData, titles) => {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const datasetIndex = tooltipItem.datasetIndex;
            const dataIndex = tooltipItem.dataIndex;
            const datasetLabel = chartData.datasets[datasetIndex].label;
            const value = chartData.datasets[datasetIndex].data[dataIndex];
            const movieTitle = titles[dataIndex];
            return `${datasetLabel}: ${value} (Movie: ${movieTitle})`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
        },
        ticks: {
          display: true,
        },
      },
      y: {
        title: {
          display: true,
          text: "Count",
        },
        ticks: {
          display: true,
        },
      },
    },
  };
};
