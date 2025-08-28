package tetrisgame;

import java.awt.Graphics;
import java.awt.Color;

public class Piece {

    private Tetromino tetromino;

    public Piece(Tetromino tetromino) {
        this.tetromino = tetromino;
    }

    public Tetromino getTetromino() {
        return tetromino;
    }

    public void setTetromino(Tetromino tetromino) {
        this.tetromino = tetromino;
    }

    public void draw(Graphics g, int x, int y) {
        boolean[][] shape = tetromino.getShape();
        int tileSize = Board.TILE_SIZE;
        g.setColor(tetromino.getColor());

        for (int row = 0; row < shape.length; row++) {
            for (int col = 0; col < shape[row].length; col++) {
                if (shape[row][col]) {
                    int drawX = (x + col) * tileSize;
                    int drawY = (y + row) * tileSize;
                    g.fillRect(drawX, drawY, tileSize, tileSize);
                    g.setColor(Color.BLACK);
                    g.drawRect(drawX, drawY, tileSize, tileSize);
                    g.setColor(tetromino.getColor());
                }
            }
        }
    }
}
