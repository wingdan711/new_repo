import React from 'react';
import { Route } from 'react-router-dom'

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import { createStructuredSelector} from 'reselect'
import { connect} from 'react-redux' 
import { selectCollections } from '../../redux/shop/shop.selectors';
import CollectionPage from '../collection/collection.component';

import { convertCollectionsSnapshotToMap, firestore} from '../../firebase/firebase.utils'
import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component { 
    unsubscribeFromSnapshot = null;

    state = {
        loading: true
    };

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');

        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({loading: false});
        });
    }

    componentWillUnmount() {

    }

    render() {
        const { match } = this.props;
        const { loading} = this.state;
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} render={(props)=> <CollectionsOverviewWithSpinner isLoading={loading} {...props}/>}/>
                <Route path={`${match.path}/:collectionId`} render={(props)=> <CollectionPageWithSpinner isLoading={loading} {...props}/>}/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

const mapStateToProps = createStructuredSelector({
    collections: selectCollections
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);