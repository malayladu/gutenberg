/**
 * External dependencies
 */
import { isEqual, find } from 'lodash';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { NavigableMenu } from '@wordpress/components';
import { BlockIcon } from '@wordpress/blocks';

/**
 * Determines which items can be selected. These are the items that are not
 * disabled.
 * 
 * @param {Editor.InserterItem[]}   items Items to filter.
 * @returns {Editor.InserterItem[]}       Items that can be selected.
 */
function deriveActiveItems( items ) {
	return items.filter( ( item ) => ! item.isDisabled );
}

export default class InserterGroup extends Component {
	/**
	 * @inheritdoc
	 */
	constructor() {
		super( ...arguments );

		this.onNavigate = this.onNavigate.bind( this );

		this.activeItems = deriveActiveItems( this.props.items );
		this.state = {
			current: this.activeItems.length > 0 ? this.activeItems[ 0 ] : null,
		};
	}

	/**
	 * @inheritdoc
	 */
	componentWillReceiveProps( nextProps ) {
		if ( ! isEqual( this.props.items, nextProps.items ) ) {
			this.activeItems = deriveActiveItems( nextProps.items );
			// Try and preserve any still valid selected state.
			const current = find( this.activeItems, ( item ) => isEqual( item, this.state.current ) );
			if ( ! current ) {
				this.setState( {
					current: this.activeItems.length > 0 ? this.activeItems[ 0 ] : null,
				} );
			}
		}
	}

	/**
	 * Renders a single item.
	 * 
	 * @param {Editor.InserterItem} item  Item to render.
	 * @param {number}              index Index of the item.
	 * @returns {JSX.Element}             Rendered button.
	 */
	renderItem( item, index ) {
		const { current } = this.state;
		const { onSelectItem } = this.props;

		return (
			<button
				role="menuitem"
				key={ index }
				className="editor-inserter__block"
				onClick={ () => onSelectItem( item ) }
				tabIndex={ isEqual( current, item ) || item.isDisabled ? null : '-1' }
				disabled={ item.isDisabled }
			>
				<BlockIcon icon={ item.icon } />
				{ item.title }
			</button>
		);
	}

	/**
	 * Updates the currently selected item in response to a user navigating the
	 * menu with their keyboard.
	 * 
	 * @param {number} index Index of the newly selected item.
	 */
	onNavigate( index ) {
		const { activeItems } = this;
		const dest = activeItems[ index ];
		if ( dest ) {
			this.setState( {
				current: dest,
			} );
		}
	}

	render() {
		const { labelledBy, items } = this.props;

		return (
			<NavigableMenu
				className="editor-inserter__category-blocks"
				orientation="both"
				aria-labelledby={ labelledBy }
				cycle={ false }
				onNavigate={ this.onNavigate }>
				{ items.map( this.renderItem, this ) }
			</NavigableMenu>
		);
	}
}
