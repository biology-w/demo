import * as React from 'react'
import './Styles.scss'

interface Props {
    name: string
}

/**
 * Hello
 */
export default class Hello extends React.Component<Props, {}> {
    render () {
        return <div className='test'>{this.props.name}</div>
    }
}
