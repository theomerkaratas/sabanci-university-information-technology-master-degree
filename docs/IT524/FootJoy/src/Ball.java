import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.*;

class Ball {
    private final Lock lock = new ReentrantLock();
    private volatile Player currentHolder;
    private final Condition ballFree = lock.newCondition();
    private boolean isInPlay = true;
    
    public boolean tryAcquire(Player player, long timeoutMillis) throws BallAccessException {
        try {
            if (lock.tryLock(timeoutMillis, TimeUnit.MILLISECONDS)) {
                if (!isInPlay) {
                    lock.unlock();
                    throw new BallAccessException("Ball is out of play");
                }
                if (currentHolder == null) {
                    currentHolder = player;
                    return true;
                }
                lock.unlock();
            }
            return false;
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new BallAccessException("Interrupted while trying to acquire ball");
        }
    }
    
    public void release(Player player) throws BallAccessException {
        lock.lock();
        try {
            if (currentHolder != player) {
                throw new BallAccessException("Player doesn't hold the ball");
            }
            currentHolder = null;
            ballFree.signalAll();
        } finally {
            lock.unlock();
        }
    }
    
    public void takeOutOfPlay() {
        lock.lock();
        try {
            isInPlay = false;
            currentHolder = null;
            ballFree.signalAll();
        } finally {
            lock.unlock();
        }
    }
    
    public boolean isAvailable() {
        lock.lock();
        try {
            return currentHolder == null && isInPlay;
        } finally {
            lock.unlock();
        }
    }
    
    public Player getCurrentHolder() {
        lock.lock();
        try {
            return currentHolder;
        } finally {
            lock.unlock();
        }
    }
}