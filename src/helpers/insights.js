export const countryChart = (movies) => {
  const countryCounts = movies.reduce((acc, movie) => {
    movie.country.forEach((country) => {
      acc[country] = (acc[country] || 0) + 1;
    });
    return acc;
  }, {});

  return {
    labels: Object.keys(countryCounts),
    datasets: [
      {
        label: "Movies by Country",
        data: Object.values(countryCounts),
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 205, 86, 0.6)",
        ],
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
      },
    ],
  };
};

export const languageChart = (movies) => {
  const languageCounts = movies.reduce((acc, movie) => {
    movie.language.forEach((language) => {
      acc[language] = (acc[language] || 0) + 1;
    });
    return acc;
  }, {});

  return {
    labels: Object.keys(languageCounts),
    datasets: [
      {
        label: "Movies by Language",
        data: Object.values(languageCounts),
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 205, 86, 0.6)",
        ],
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
      },
    ],
  };
};

export const chartOptions = {
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.label}: ${context.raw} movies`;
        },
      },
    },
    legend: {
      position: "top",
    },
  },
};
