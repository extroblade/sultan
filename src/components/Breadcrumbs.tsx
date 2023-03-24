// import { Link, useLocation } from 'react-router-dom'
// import useBreadcrumbs from 'use-react-router-breadcrumbs'
// import {ItemState} from "../store/types/item";
// import {useTypedSelector} from "../hooks/useTypedSelector";
// import {useDispatch} from "react-redux";
// import {useEffect} from "react";
// import {fetchItems} from "../store/actions/fetchItems";
//
//
// const routes = [
//   { path: '/users/:userId', breadcrumb: 'Example 1' },
//   { path: '/data', breadcrumb: 'Example 2' }
// ];

function Breadcrumbs() {

  // const {items, error, loading}: ItemState = useTypedSelector(state => state.items)
  // const dispatch = useDispatch()
  //
  // useEffect(() => {
  //   dispatch(fetchItems())
  // }, [dispatch])
  //
  // const breadcrumbs = useBreadcrumbs(routes);
  // const location = useLocation()
  // console.log(breadcrumbs)

  return (
    <nav>
      {/*{breadcrumbs.map((i) => (*/}
      {/*  <Link*/}

      {/*    to={i.match}*/}
      {/*    className={i.match.pathname === location.pathname ? "breadcrumb-active" : "breadcrumb-not-active"}*/}
      {/*  >*/}
      {/*    {i.breadcrumb} /*/}
      {/*  </Link>*/}
      {/*))}*/}
    </nav>
  );
}

export default Breadcrumbs;
