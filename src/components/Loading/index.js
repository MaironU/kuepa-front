import loading from '../../images/loading.gif'
import './index.css'

const Loading = (props) => {
    const { isLoading = false }  = props;

    if (!isLoading) {
      return null;
    }

    return(
      <div className="loading">
          <img src={loading} />
      </div>
    )
}

export default Loading
