package tetrisgame;

import java.awt.Color;
import java.util.Random;

public class Tetromino {

    private boolean[][] shape;
    private Color color;

    public Tetromino(boolean[][] shape, Color color) {
        this.shape = shape;
        this.color = color;
    }

    public boolean[][] getShape() {
        return shape;
    }

    public Color getColor() {
        return color;
    }

    // Хэлбэрийг 90 градус эргүүлэх
    public Tetromino rotate() {
        int rows = shape.length;
        int cols = shape[0].length;
        boolean[][] rotated = new boolean[cols][rows];

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                rotated[c][rows - 1 - r] = shape[r][c];
            }
        }

        return new Tetromino(rotated, color);
    }

    // Тогтсон хэлбэрүүдийг хадгалах static factory method
    public static Tetromino[] templates = {
        new Tetromino(new boolean[][] {
            {true, true, true, true}
        }, Color.CYAN),  // I

        new Tetromino(new boolean[][] {
            {true, true},
            {true, true}
        }, Color.YELLOW), // O

        new Tetromino(new boolean[][] {
            {false, true, false},
            {true, true, true}
        }, Color.MAGENTA), // T

        new Tetromino(new boolean[][] {
            {false, true, true},
            {true, true, false}
        }, Color.GREEN), // S

        new Tetromino(new boolean[][] {
            {true, true, false},
            {false, true, true}
        }, Color.RED), // Z

        new Tetromino(new boolean[][] {
            {true, false, false},
            {true, true, true}
        }, Color.BLUE), // J

        new Tetromino(new boolean[][] {
            {false, false, true},
            {true, true, true}
        }, Color.ORANGE) // L
    };

    private static final Random RANDOM = new Random();

    public static Tetromino getRandomTetromino() {
        Tetromino proto = templates[RANDOM.nextInt(templates.length)];
       
        return new Tetromino(proto.getShape(), proto.getColor());
    }
}
