import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMensData, getMensData } from '../Redux/action';
import ProductCard from '../components/ProductCard';
import "../style/Mens.css";

function Mens() {
  const dispatch = useDispatch();
  const { totalMens, mensData, AllMensData } = useSelector(state => state.mens);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const totalPages = Math.ceil(totalMens / 12);
  const array = Array.from({ length: totalPages }, (_, index) => index + 1);

  useEffect(() => {
    dispatch(getMensData(page, filter, sort));
  }, [page, dispatch, filter, sort]);

  useEffect(() => {
    dispatch(getAllMensData())
  }, [dispatch]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    window.scrollTo({
      top: 350,
      left: 0,
      behavior: 'smooth'
    });
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setPage(1);
  };
  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  const uniqueCategories = [...new Set(AllMensData.map(item => item.category))];

  return (
    <div className="Mens-container">
      <section id="page-header-mens"></section>
      <div className="filter-sort-container">
        <select value={filter} onChange={handleFilterChange}>
          <option value="">All Categories</option>
          {uniqueCategories.map((category) => <option key={category} value={category}>{category}</option>)}
        </select>
        <select value={sort} onChange={handleSortChange}>
          <option value="">Default</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
      <div className="products-grid">
        {mensData.map(item => (
          <ProductCard key={item._id} item={item} />
        ))}
      </div>
      <div className="pagination">
        {array.map(number => (
          <button
            className={`page-button ${page === number ? 'active' : ''}`}
            key={number}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Mens;
