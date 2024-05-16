const React = require('react');
const DefaultLayout = require('./layouts/default');

function Show({ bread }) {
  return (
    <DefaultLayout>
      <h3>{bread.name}</h3>
      <p>
        and it {
          bread.hasGluten
            ? <span> does </span>
            : <span> does NOT </span>
        } have gluten.
      </p>
      <img src={bread.image} alt={bread.name} />
      <p>Baked by {bread.baker}</p>
      <a href={`/breads/${bread.id}/edit`}><button>Edit</button></a>
      <label htmlFor="baker">Baker</label>
      <select name="baker" id="baker" defaultValue={bread.baker}>
        <option value="Rachel">Rachel</option>
        <option value="Monica">Monica</option>
        <option value="Joey">Joey</option>
        <option value="Chandler">Chandler</option>
        <option value="Ross">Ross</option>
        <option value="Phoebe">Phoebe</option>
      </select>
      <form action={`/breads/${bread.id}?_method=DELETE`} method="POST">
        <input type='submit' value="DELETE" />
      </form>
    </DefaultLayout>
  );
}

module.exports = Show;


