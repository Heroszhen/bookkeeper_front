import { render, queryByAttribute, fireEvent } from "@testing-library/react";//afficher une page
import Login from './Login';//importer le composant Login


describe("Login Component", ()=>{
    const getById = queryByAttribute.bind(null, 'id');
    function setPage(page){}
    function setLoading(loading){}

    //une bloque
    it("rendered login", ()=>{
        //sélecteurs
        const { container, getByText } = render(<Login setPage={setPage} />);
        let title = getByText("Connectez-vous");
        let inputEmail = getById(container, "email");
        let inputPassword = getById(container, "password");
        expect(title).toBeTruthy();
        expect(inputEmail).toBeTruthy();
        expect(inputPassword).toBeTruthy();
    });

    it("test input", ()=>{
        const { container } = render(<Login setPage={setPage} setLoading={setLoading} />);
        let inputEmail = getById(container, "email");
        let inputPassword = getById(container, "password");
        fireEvent.change(inputEmail, {
            target: { value: 'abc@gmail' }
        });
        fireEvent.change(inputPassword, {
            target: { value: '111111111' }
        });
        expect(inputEmail.value).toBe('abc@gmail');
        expect(inputPassword.value).toBe('111111111');
        let button = container.getElementsByClassName('btn')[0];
        fireEvent.click(button);
    });
})



/*
 container: HTMLDivElement {
          '__reactContainer$zbx8zkpn1md': FiberNode {
            tag: 3,
            key: null,
            elementType: null,
            type: null,
            stateNode: [FiberRootNode],
            return: null,
            child: null,
            sibling: null,
            index: 0,
            ref: null,
            pendingProps: null,
            memoizedProps: null,
            updateQueue: [Object],
            memoizedState: [Object],
            dependencies: null,
            mode: 1,
            flags: 0,
            subtreeFlags: 0,
            deletions: null,
            lanes: 16,
            childLanes: 0,
            alternate: [FiberNode],
            actualDuration: 0,
            actualStartTime: -1,
            selfBaseDuration: 0,
            treeBaseDuration: 0,
            _debugSource: null,
            _debugOwner: null,
            _debugNeedsRemount: false,
            _debugHookTypes: null
          },
          _reactListeningju1vpwejlm: true
        },
        baseElement: HTMLBodyElement {},
        debug: [Function: debug],
        unmount: [Function: unmount],
        rerender: [Function: rerender],
        asFragment: [Function: asFragment],
        findAllByLabelText: [Function: bound ],
        findByLabelText: [Function: bound ],
        getAllByLabelText: [Function: bound ],
        getByLabelText: [Function: bound ],
        queryAllByLabelText: [Function: bound ],
        queryByLabelText: [Function: bound ],
        findAllByPlaceholderText: [Function: bound ],
        findByPlaceholderText: [Function: bound ],
        getAllByPlaceholderText: [Function: bound ],
        getByPlaceholderText: [Function: bound ],
        queryAllByPlaceholderText: [Function: bound ],
        queryByPlaceholderText: [Function: bound ],
        findAllByText: [Function: bound ],
        findByText: [Function: bound ],
        getAllByText: [Function: bound ],
        getByText: [Function: bound ],
        queryAllByText: [Function: bound ],
        queryByText: [Function: bound ],
        findAllByDisplayValue: [Function: bound ],
        findByDisplayValue: [Function: bound ],
        getAllByDisplayValue: [Function: bound ],
        getByDisplayValue: [Function: bound ],
        queryAllByDisplayValue: [Function: bound ],
        queryByDisplayValue: [Function: bound ],
        findAllByAltText: [Function: bound ],
        findByAltText: [Function: bound ],
        getAllByAltText: [Function: bound ],
        getByAltText: [Function: bound ],
        queryAllByAltText: [Function: bound ],
        queryByAltText: [Function: bound ],
        findAllByTitle: [Function: bound ],
        findByTitle: [Function: bound ],
        getAllByTitle: [Function: bound ],
        getByTitle: [Function: bound ],
        queryAllByTitle: [Function: bound ],
        queryByTitle: [Function: bound ],
        findAllByRole: [Function: bound ],
        findByRole: [Function: bound ],
        getAllByRole: [Function: bound ],
        getByRole: [Function: bound ],
        queryAllByRole: [Function: bound ],
        queryByRole: [Function: bound ],
        findAllByTestId: [Function: bound ],
        findByTestId: [Function: bound ],
        getAllByTestId: [Function: bound ],
        getByTestId: [Function: bound ],
        queryAllByTestId: [Function: bound ],
        queryByTestId: [Function: bound ]
      }
*/