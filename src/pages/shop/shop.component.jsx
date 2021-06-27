import React from 'react';
import { Route } from 'react-router-dom'

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import { createStructuredSelector} from 'reselect'
import { connect} from 'react-redux' 
import { selectCollections } from '../../redux/shop/shop.selectors';
import CollectionPage from '../collection/collection.component';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component { 
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { fetchCollectionsStart} = this.props;
        fetchCollectionsStart();
    }

    componentWillUnmount() {

    }

    render() {
        const { match, isCollectionLoaded } = this.props;

        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} render={(props)=> <CollectionsOverviewWithSpinner isLoading={!isCollectionLoaded} {...props}/>}/>
                <Route path={`${match.path}/:collectionId`} render={(props)=> <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props}/>}/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStartAsync())
})

const mapStateToProps = createStructuredSelector({
    collections: selectCollections,
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionLoaded: selectIsCollectionsLoaded
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);