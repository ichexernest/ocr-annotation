import styled from "styled-components";
export const Wrapper = styled.div`
display:flex;
flex-direction:column;
padding: 0;
table {
    border-spacing: 0;
    border: 1px solid var(--lightGrey);
    width:100%;
    thead{
        font-weight:bold;
        line-height:1.5rem;
    }
    tr {
        background-color:#e9e9e9;
        &:nth-of-type(odd){
            background: var(--white);
        }
        :hover{
            background: var(--tableActionColor);
        }
        :last-child {
        td {
            border-bottom: 0;
            }
        }
    }

    th,
    td {
        margin: 0;
        padding: 0.1rem;
        border-bottom: 1px solid var(--lightGrey);
        border-right: 1px solid var(--lightGrey);
        :last-child {
            border-right: 0;
        }
    }
}
`

