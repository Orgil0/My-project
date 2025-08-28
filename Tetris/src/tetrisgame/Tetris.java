package tetrisgame;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class Tetris extends JPanel implements ActionListener, KeyListener {

    private Board board;
    private Timer timer;
    private Timer moveTimer;
    private int moveDirection = 0; // -1 = left, 1 = right

    public Tetris() {
        board = new Board();

        setPreferredSize(new Dimension(Board.COLS * Board.TILE_SIZE, Board.ROWS * Board.TILE_SIZE));
        setBackground(Color.BLACK);

        timer = new Timer(500, this);  // 0.5 секунд тутам шинэчлэл
        timer.start();

        setFocusable(true);
        addKeyListener(this);
        
        moveTimer = new Timer(70, e -> {
            if (moveDirection != 0) {
                if (moveDirection == -1) {
                    board.moveLeft();
                } else {
                    board.moveRight();
                }
                repaint();
            }
        });
        moveTimer.setRepeats(true);

    }

    @Override
    public void paintComponent(Graphics g) {
        super.paintComponent(g);
        board.draw(g);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        board.update();
        repaint();
    }

  
    @Override
    public void keyPressed(KeyEvent e) {
        switch (e.getKeyCode()) {
            case KeyEvent.VK_LEFT:
                board.moveLeft();
                moveDirection = -1;
                moveTimer.start();
                break;
            case KeyEvent.VK_RIGHT:
                board.moveRight();
                moveDirection = 1;
                moveTimer.start();
                break;
            case KeyEvent.VK_DOWN:
                board.softDrop();
                break;
            case KeyEvent.VK_UP:
                board.rotate();
                break;
            case KeyEvent.VK_SPACE:
                board.hardDrop();
                break;
        }
        repaint();
    }


    @Override 
    public void keyReleased(KeyEvent e) {
    	if (e.getKeyCode() == KeyEvent.VK_LEFT || e.getKeyCode() == KeyEvent.VK_RIGHT) {
            moveDirection = 0;
            moveTimer.stop();
        }
    }
    @Override public void keyTyped(KeyEvent e) {}

    public static void main(String[] args) {
        JFrame frame = new JFrame("Tetris");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setResizable(false);

        Tetris gamePanel = new Tetris();
        frame.add(gamePanel);

        frame.pack();
        frame.setLocationRelativeTo(null);
        frame.setVisible(true);
    }
}
