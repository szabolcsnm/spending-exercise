import styled from 'styled-components';

export const InputWrapperStyles = styled.div`
  ${props => props.type === 'description' ? 'flex: 1' : 'width: 150px'};
  position: relative;
`;

export const InputStyles = styled.input`
  font-family: var(--font-family);
  border: none;
  padding: 10px 15px;
  font-size: 18px;
  font-weight: 700;
  border-radius: 8px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  color: var(--color-blue);
  ${props => props.error && 'border: 2px solid red;'}

  &:focus {
    border-radius: 8px;
  }

  &::placeholder {
    color: darkgray;
  }

  &:focus::placeholder {
    color: transparent;
  }

  &[type='text'] {
    /* flex: 1; */
    width: 100%;
  }

  &[type='number'] {
    /* width: 150px; */
    width: 100%;
  }

  &[type='submit'] {
    background-color: #08b783;
    color: var(--color-white);
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0px);
    }
  }
`;


