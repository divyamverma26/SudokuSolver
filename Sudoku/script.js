function handle(event){
    event.preventDefault();
    document.getElementById('sol').innerText = 'Sudoku solved!';
    const input = document.querySelector('.input').value.trim();
    const arena = document.querySelector('.arena');
    const solution = document.querySelector('.solution');
    const questionGrid = document.querySelector('.question');
    const answerGrid = document.querySelector('.answer');
    let sudoku;

    if(input==''){
        sudoku=randomSudoku();
    }
    else{
        sudoku=parseInput(input);
    }

    let sudokuCopy = JSON.parse(JSON.stringify(sudoku));
    if (solve(sudoku, 0, 0)) {
        displaySolution(sudokuCopy,questionGrid,sudokuCopy);
        displaySolution(sudoku, answerGrid,sudokuCopy);
        arena.style.display = 'none';
        solution.style.display = 'block';
    } else {
        alert('Sudoku is unsolvable');
    }
}

function randomSudoku(){
    return [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ]
}

function parseInput(input) {
    const values = input.split(',').map(Number);
    const sudoku = [];
    for (let i = 0; i < 9; i++) {
        sudoku.push(values.slice(i * 9, i * 9 + 9));
    }
    return sudoku;
}

function displaySolution(board, grid,original) {
    grid.innerHTML = '';
    const N=board.length;
    const C=board[0].length;
    for (let row = 0; row < N; row++) {
        for (let col = 0; col < C; col++) {
            const cell = document.createElement('div');
            if(board[row][col]!==0){
                cell.textContent =board[row][col];
                if(original[row][col]===0){
                    cell.style.color='red';
                }
            }
            else{
                cell.textContent ='x';
                cell.style.color='red';
            }
            // cell.textContent = board[row][col] !== 0 ? board[row][col] : 'x';
            grid.appendChild(cell);
            cell.addEventListener('mouseover', () => {
                cell.style.transition = 'background-color 0.2s ease, font-size 0.2s ease';
                cell.style.backgroundColor = 'aliceblue';
                cell.style.fontSize = '27px';
            });
            
            cell.addEventListener('mouseleave', () => {
                cell.style.transition = 'background-color 0.2s ease, font-size 0.2s ease';
                cell.style.backgroundColor = '';
                cell.style.fontSize = '';
            });
        }
    }
}

function isSafe(arr, row, col, digit){
    const N=arr.length;
    const sqN=Math.sqrt(N);
    for(let i=0;i<N;i++){
        if(arr[i][col]===digit){
            return false;
        }
    }
    for(let i=0;i<N;i++){
        if(arr[row][i]===digit){
            return false;
        }
    }
    let sc = Math.floor(col / 3) * 3;
    let sr = Math.floor(row / 3) * 3;

    for(let i=sr;i<sr+sqN;i++){
        for(let j=sc;j<sc+sqN;j++){
            if(arr[i][j]===digit){
                return false;
            }
        }
    }

    return true;
}

function solve(arr, row, col){
    const N=arr.length;
    if(row===N){
        return true;
    }
    let nextRow=row;
    let nextCol=col+1;

    if(col+1===N){
        nextCol=0;
        nextRow=row+1;
    }

    if(arr[row][col]!==0){
        return solve(arr,nextRow,nextCol);
    }

    for(let i=1;i<=N;i++){
        if(isSafe(arr,row,col,i)){
            arr[row][col]=i;
            if(solve(arr,nextRow,nextCol)){
                return true;
            }
            arr[row][col]=0;
        }
    }
    return false;
}

function handle2(event2){
    event2.preventDefault();
    const input = document.querySelector('.input');
    const arena = document.querySelector('.arena');
    const solution = document.querySelector('.solution');
    input.value='';
    arena.style.display='';
    solution.style.display='none';
}