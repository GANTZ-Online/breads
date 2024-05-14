const React = require('react');
const Default = require('./layouts/Default');

function Index({ breads }) {
  return (
    <Default>
      <h2>Index Page</h2>
      <ul>
        <div className="backButton">
          <a href="/breads"><button>Go back to the index</button></a>
        </div>
        {breads.map((bread, index) => (
          <li key={index}>
            <a href={`/breads/${bread.id}`}>
               {bread.name}
            </a>
          </li>
        ))}
      </ul>
    </Default>
  );
}

module.exports = Index;


