package tetrisgame;

import java.awt.Color;
import java.awt.Graphics;

public class Board {

    public static final int ROWS = 20;
    public static final int COLS = 40;
    public static final int TILE_SIZE = 30;

    private Color[][] grid;         // Самбарын өнгө хадгалах массив
    private Piece currentPiece;     // Одоогийн хэлбэр
    private int currentX, currentY; // Хэлбэрийн байрлал

    public Board() {
        grid = new Color[ROWS][COLS];
        spawnPiece();
    }

    // Одоогийн хэлбэрийг зүүн тийш хөдөлгөх
    public void moveLeft() {
        if (isValidPosition(currentPiece.getTetromino(), currentX - 1, currentY)) {
            currentX--;
        }
    }

    // Баруун тийш хөдөлгөх
    public void moveRight() {
        if (isValidPosition(currentPiece.getTetromino(), currentX + 1, currentY)) {
            currentX++;
        }
    }

    // Нэг мөр доош унах (soft drop)
    public void softDrop() {
        if (isValidPosition(currentPiece.getTetromino(), currentX, currentY + 1)) {
            currentY++;
        } else {
            lockPiece();
            spawnPiece();
        }
    }

    // Хурдан доош унах (hard drop)
    public void hardDrop() {
        while (isValidPosition(currentPiece.getTetromino(), currentX, currentY + 1)) {
            currentY++;
        }
        lockPiece();
        spawnPiece();
    }

    // Эргүүлэх
    public void rotate() {
        Tetromino rotated = currentPiece.getTetromino().rotate();
        if (isValidPosition(rotated, currentX, currentY)) {
            currentPiece.setTetromino(rotated);
        }
    }

    // Шинэ хэлбэр үүсгэх
    private void spawnPiece() {
        Tetromino type = Tetromino.getRandomTetromino();
        currentPiece = new Piece(type);
        currentX = COLS / 2 - 20;
        currentY = 0;
    }

    // Хэлбэр байрлуулах боломжтой эсэх шалгах
    private boolean isValidPosition(Tetromino tetromino, int x, int y) {
        boolean[][] shape = tetromino.getShape();

        for (int row = 0; row < shape.length; row++) {
            for (int col = 0; col < shape[row].length; col++) {
                if (shape[row][col]) {
                    int boardX = x + col;
                    int boardY = y + row;

                    if (boardX < 0 || boardX >= COLS || boardY < 0 || boardY >= ROWS) {
                        return false;
                    }
                    if (grid[boardY][boardX] != null) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    // Хэлбэрийг тогтоох (самбар дээр буулгах)
    private void lockPiece() {
        boolean[][] shape = currentPiece.getTetromino().getShape();
        Color color = currentPiece.getTetromino().getColor();

        for (int row = 0; row < shape.length; row++) {
            for (int col = 0; col < shape[row].length; col++) {
                if (shape[row][col]) {
                    int boardX = currentX + col;
                    int boardY = currentY + row;
                    if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
                        grid[boardY][boardX] = color;
                    }
                }
            }
        }

        clearLines();
    }

    // Бүтэн мөрийг цэвэрлэх
    private void clearLines() {
        for (int row = 0; row < ROWS; row++) {
            boolean fullLine = true;
            for (int col = 0; col < COLS; col++) {
                if (grid[row][col] == null) {
                    fullLine = false;
                    break;
                }
            }

            if (fullLine) {
                // Доош нь мөрүүдийг хуулах
                for (int r = row; r > 0; r--) {
                    System.arraycopy(grid[r - 1], 0, grid[r], 0, COLS);
                }
                // Дээд мөрийг хоослох
                for (int c = 0; c < COLS; c++) {
                    grid[0][c] = null;
                }
            }
        }
    }

    // Тоглоомын шинэчлэлт (нэг алхам доош унах)
    public void update() {
        softDrop();
    }

    // Самбарыг зурах
    public void draw(Graphics g) {
        for (int row = 0; row < ROWS; row++) {
            for (int col = 0; col < COLS; col++) {
                if (grid[row][col] != null) {
                    g.setColor(grid[row][col]);
                    g.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                }
                g.setColor(Color.DARK_GRAY);
                g.drawRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }

        // Одоогийн хэлбэрийг зурна
        if (currentPiece != null) {
            currentPiece.draw(g, currentX, currentY);
        }
    }
}
