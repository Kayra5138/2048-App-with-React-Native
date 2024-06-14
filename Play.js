import React, { useState, useEffect} from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, Dimensions, Text, Image, PanResponder, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');
const CELL_MARGIN = 10;
const CELL_SIZE = (width - CELL_MARGIN * 5) / 4;
const SWIPE_THRESHOLD = 50;

let score = 0;

const Play = () => {
  const navigation = useNavigation();
  const [grid, setGrid] = useState(initialGrid());
  const numbers = Array.from({ length: 16 }, (_, index) => index + 1);
  const [swipeAllowed, setSwipeAllowed] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  
  function initialGrid() {
    return Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => 0));
  }

  const handleNewGame = () => {
    setGrid(addRandomNumber(addRandomNumber(initialGrid())));
    setGameOver(false);
  };


  const addRandomNumber = (grid) => {
    const emptyCells = [];
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 0) {
          emptyCells.push({ row: rowIndex, col: colIndex });
        }
      });
    });

    if (emptyCells.length === 0) {
      return grid;
    }

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const { row, col } = emptyCells[randomIndex];

    const newValue = Math.random() < 0.9 ? 2 : 4;
    grid[row][col] = newValue;
    checkGameOver(grid);
    return grid;
  };


  const updateGrid = (newGrid) => {
    setGrid(newGrid);
  };

  const moveLeft = () => {
    let moved = false;
    const newGrid = grid.map(row => {  
      row.forEach((cell, index) => {
        if (cell !== 0) {
          let destination = index; 
          while (destination > 0 && row[destination - 1] === 0) {
            row[destination - 1] = cell;
            row[destination] = 0;
            destination--;
            moved = true;
          }
        }
      });
      return row;
    });
    updateGrid(newGrid);
    return moved;
  };
  
  const swipeLeft = () => {
    const moved = moveLeft();
    let merged = false;
    const newGrid = grid.map(row => {
      const newRow = [];
      for (let i = 0; i < row.length; i++) {
        if (row[i] === row[i + 1] && row[i] !== 0) {
          newRow.push(row[i] * 2);
          row[i + 1] = 0;
          merged = true; 
          i++;
        } else { newRow.push(row[i]); }
      }
      return newRow.concat(Array(4 - newRow.length).fill(0));
    });
    updateGrid(newGrid);
    if (moved || merged) { addRandomNumber(newGrid); }
  };
  


  const moveRight = () => {
    let moved = false;
  
    const newGrid = grid.map(row => {
      const newRow = [];
  
      for (let i = row.length - 1; i >= 0; i--) {
        if (row[i] !== 0) {
          let destination = i;
  
          while (destination < row.length - 1 && row[destination + 1] === 0) {
            row[destination + 1] = row[destination];
            row[destination] = 0;
            destination++;
            moved = true;
          }
        }
      }
  
      return row;
    });
  
    updateGrid(newGrid);
  
    return moved;
  };
  
  const swipeRight = () => {
    const moved = moveRight();
    let merged = false;
  
    const newGrid = grid.map(row => {
      const newRow = [];
  
      for (let i = row.length - 1; i >= 0; i--) {
        if (row[i] === row[i - 1] && row[i] !== 0) {
          newRow.unshift(row[i] * 2);
          row[i - 1] = 0;
          merged = true;
          i--;
        } else {
          newRow.unshift(row[i]);
        }
      }
  
      return Array(4 - newRow.length).fill(0).concat(newRow);
    });
  
    updateGrid(newGrid);
  
    if (moved || merged) {
      addRandomNumber(newGrid);
    }
  };
  
  

  const moveUp = () => {
    let moved = false;
  
    const newGrid = Array.from({ length: 4 }, () => Array(4).fill(0));
  
    for (let col = 0; col < 4; col++) {
      const colValues = [];
  
      for (let row = 0; row < 4; row++) {
        if (grid[row][col] !== 0) {
          colValues.push(grid[row][col]);
        }
      }
  
      let newRow = 0;
  
      for (let i = 0; i < colValues.length; i++) {
        newGrid[newRow][col] = colValues[i];
        newRow++;
      }
  
      if (JSON.stringify(grid.map(row => row[col])) !== JSON.stringify(newGrid.map(row => row[col]))) {
        moved = true;
      }
    }
  
    updateGrid(newGrid);
  
    return moved;
  };
  
  const swipeUp = () => {
    const moved = moveUp();
    let merged = false;
  
    const newGrid = Array.from({ length: 4 }, () => Array(4).fill(0));
  
    for (let col = 0; col < 4; col++) {
      const colValues = [];
  
      for (let row = 0; row < 4; row++) {
        if (grid[row][col] !== 0) {
          colValues.push(grid[row][col]);
        }
      }
  
      for (let i = 0; i < colValues.length; i++) {
        if (colValues[i] === colValues[i + 1] && colValues[i] !== 0) {
          newGrid[i][col] = colValues[i] * 2;
          newGrid[i + 1][col] = 0;
          merged = true;
          i++;
        } else {
          newGrid[i][col] = colValues[i];
        }
      }
    }
  
    updateGrid(newGrid);
  
    if (moved || merged) {
      addRandomNumber(newGrid);
    }
  };
  

  const moveDown = () => {
    let moved = false;
  
    const newGrid = Array.from({ length: 4 }, () => Array(4).fill(0));
  
    for (let col = 0; col < 4; col++) {
      const colValues = [];
  
      for (let row = 3; row >= 0; row--) {
        if (grid[row][col] !== 0) {
          colValues.push(grid[row][col]);
        }
      }
  
      let newRow = 3;
  
      for (let i = 0; i < colValues.length; i++) {
        newGrid[newRow][col] = colValues[i];
        newRow--;
      }
  
      if (JSON.stringify(grid.map(row => row[col])) !== JSON.stringify(newGrid.map(row => row[col]))) {
        moved = true;
      }
    }
  
    updateGrid(newGrid);
  
    return moved;
  };
  
  const swipeDown = () => {
    const moved = moveDown();
    let merged = false;
  
    const newGrid = Array.from({ length: 4 }, () => Array(4).fill(0));
  
    for (let col = 0; col < 4; col++) {
      const colValues = [];
  
      for (let row = 3; row >= 0; row--) {
        if (grid[row][col] !== 0) {
          colValues.push(grid[row][col]);
        }
      }
  
      for (let i = 0; i < colValues.length; i++) {
        if (colValues[i] === colValues[i + 1] && colValues[i] !== 0) {
          newGrid[3 - i][col] = colValues[i] * 2;
          newGrid[3 - i - 1][col] = 0;
          merged = true;
          i++;
        } else {
          newGrid[3 - i][col] = colValues[i];
        }
      }
    }
  
    updateGrid(newGrid);
  
    if (moved || merged) {
      addRandomNumber(newGrid);
    }
  };


  const checkGameOver = (grid) => {
    updateScore(grid);
    for (let row = 0; row < 4; row++) { for (let col = 0; col < 4; col++) { if (grid[row][col] === 0) { setGameOver(false); return false; } } }
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (col < 3 && grid[row][col] === grid[row][col + 1]) {
          setGameOver(false);
          return false;
        }
        if (row < 3 && grid[row][col] === grid[row + 1][col]) {
          setGameOver(false);
          return false;
        }
      }
    }
    setGameOver(true);
    return true;
  };
  
  const updateScore = (grid) => {
    let totalScore = 0;
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        totalScore += grid[row][col];
      }
    }
    score = totalScore;
  };

  
  useEffect(() => {
    handleNewGame();
  }, []);


  const handleMove = (direction) => {
    switch (direction) {
      case 'left':
        swipeLeft();
        break;
      case 'right':
        swipeRight();
        break;
      case 'up':
        swipeUp();
        break;
      case 'down':
        swipeDown();
        break;
      default:
        break;
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const { dx, dy } = gestureState;
      if (!swipeAllowed) return;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD) {
        setSwipeAllowed(false);
        if (dx > 0) {
          handleMove('right');
        } else {
          handleMove('left');
        }
      } else if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > SWIPE_THRESHOLD) {
        setSwipeAllowed(false);
        if (dy > 0) {
          handleMove('down');
        } else {
          handleMove('up');
        }
      }
    },
    onPanResponderRelease: () => {
      setSwipeAllowed(true); 
    },
  });


  const renderItem = ({ index }) => {
    const cellValue = grid[Math.floor(index / 4)][index % 4];
    const imageSource = cellValue === 2 ? require('./tiles/2.png') : cellValue === 4 ? require('./tiles/4.png') :
      cellValue === 8 ? require('./tiles/8.png') : cellValue === 16 ? require('./tiles/16.png') :
        cellValue === 32 ? require('./tiles/32.png') : cellValue === 64 ? require('./tiles/64.png') :
          cellValue === 128 ? require('./tiles/128.png') : cellValue === 256 ? require('./tiles/256.png') :
            cellValue === 512 ? require('./tiles/512.png') : cellValue === 1024 ? require('./tiles/1024.png') :
              cellValue === 2048 ? require('./tiles/2048.png') : null;
    return (
      <TouchableOpacity style={styles.cell} disabled pointerEvents="none">
        {cellValue !== 0 && (
          <Image
            style={[styles.image, { width: CELL_SIZE, height: CELL_SIZE }]}
            source={imageSource}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
     <View style={styles.scoreContainer}>
      <Text style={styles.scoreText}>Score</Text>
      <Text style={styles.scoreText}>{score}</Text>
     </View>
      <View {...panResponder.panHandlers} style={styles.gridContainer}>
      {gameOver && (
        <View style={styles.gameOverOverlay}>
          <Text style={styles.gameOverText}>Game Over</Text>
        </View>
      )}
      <FlatList data={numbers} numColumns={4} renderItem={renderItem} keyExtractor={(item) => item.toString()} contentContainerStyle={styles.flatListContainer} scrollEnabled={false} />
      </View>
      <View style={styles.icons}>
        <TouchableOpacity style={styles.button} onPress={handleNewGame}>
          <Icon name="refresh" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Icon name="home" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: CELL_MARGIN,
    justifyContent: 'center',
    backgroundColor: '#524e4e',
  },
  flatListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    margin: CELL_MARGIN / 2.5,
    backgroundColor: '#696969',
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
  },
  icons: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: CELL_MARGIN,
  },
  button: {
    padding: 10,
    borderRadius: 2,
    marginRight: CELL_MARGIN,
  },
  gameOverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  gameOverText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 1)',
    zIndex: 20,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: CELL_MARGIN,
  },
  scoreText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Play;