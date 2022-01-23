import { shallow } from 'enzyme';
import { NotImage } from '../../components/NotImage';

describe( 'Test of Component <NotImage/>', () => {

  test( '<NotImage/> must be rendered correctly', () => {

    const wrapper = shallow( <NotImage/> );
    expect( wrapper ).toMatchSnapshot();

  });

});