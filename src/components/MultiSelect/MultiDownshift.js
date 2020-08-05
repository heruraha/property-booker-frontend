import React from 'react'
import Downshift from 'downshift'

class MultiDownshift extends React.Component {
  state = {
    selectedItems: this.props.selectedItems.length > 0 ? this.props.selectedItems : [],
    type: this.props.type ? this.props.type : ''
  }

  stateReducer = (state, changes) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.clickItem:
        return {
          ...changes,
          isOpen: true,
        }
      default:
        return changes
    }
  }

  handleSelection = (selectedItem, downshift) => {
    const callOnChange = () => {
      if (this.props.onSelect) {
        this.props.onSelect(
          this.state.selectedItems,
          this.getStateAndHelpers(downshift),
        )
      }
      if (this.props.onChange) {
        this.props.onChange(
          this.state.selectedItems,
          this.getStateAndHelpers(downshift),
        )
      }
    }
    if (this.state.selectedItems.includes(selectedItem)) {
      this.removeItem(selectedItem, callOnChange)
    } else {
      this.addSelectedItem(selectedItem, callOnChange)
    }
  }

  removeItem(item, cb) {
    this.props.onDelete(item, this.state.type)
    this.setState(({selectedItems}) => {
      return {
        selectedItems: selectedItems.filter(i => i !== item),
      }
    }, cb)
  }
  addSelectedItem(item, cb) {
    this.setState(
      ({selectedItems}) => ({
        selectedItems: [...selectedItems, item],
      }),
      cb,
    )
  }

  getRemoveButtonProps = ({onClick, item, name, ...props} = {}) => {
    return {
      onClick: e => {
        // TODO: use something like downshift's composeEventHandlers utility instead
        onClick && onClick(e)
        e.stopPropagation()
        this.removeItem(item)
      },
      ...props,
    }
  }

  getStateAndHelpers(downshift) {
    const {selectedItems} = this.state
    const {getRemoveButtonProps} = this
    return {
      getRemoveButtonProps,
      selectedItems,
      ...downshift,
    }
  }
  render() {
    const {render, children = render, ...props} = this.props
    // TODO: compose together props (rather than overwriting them) like downshift does
    return (
      <Downshift
        {...props}
        stateReducer={this.stateReducer}
        onChange={this.handleSelection}
        selectedItem={props.selectedItems ? props.selectedItems : null}
      >
        {downshift => children(this.getStateAndHelpers(downshift))}
      </Downshift>
    )
  }
}

export default MultiDownshift
