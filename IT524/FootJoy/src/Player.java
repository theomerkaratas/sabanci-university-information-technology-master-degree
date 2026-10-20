import java.util.Date;

abstract class Player {
    protected final String name;
    protected final Team team;
    protected final PlayerStatistics stats;
    protected volatile boolean isActive;
    protected final Ball ball;
    
    public Player(String name, Team team, Ball ball) {
        this.name = name;
        this.team = team;
        this.ball = ball;
        this.stats = new PlayerStatistics();
        this.isActive = true;
    }
    
    public abstract void play() throws GameException;
    
    protected Action chooseAction() {
        double rand = Math.random();
        if (rand < 0.3) return Action.SHOOT;
        if (rand < 0.6) return Action.PASS;
        if (rand < 0.8) return Action.DRIBBLE;
        return Action.DEFEND;
    }
    
    protected void executeAction(Action action) throws GameException {
        try {
            System.out.printf("[%s] %s from %s team performs: %s%n",
                    new Date(), name, team, action);
            
            switch (action) {
                case SHOOT:
                    shoot();
                    break;
                case PASS:
                    pass();
                    break;
                case DRIBBLE:
                    dribble();
                    break;
                case DEFEND:
                    defend();
                    break;
            }
        } catch (Exception e) {
            throw new GameException("Error executing action: " + e.getMessage());
        }
    }
    
    protected void acquireBall() throws BallAccessException {
        if (ball.tryAcquire(this, 1000)) {
            stats.addTouch();
            System.out.printf("[%s] %s acquired the ball%n", new Date(), name);
        } else {
            throw new BallAccessException(name + " couldn't acquire the ball");
        }
    }
    
    protected void releaseBall() throws BallAccessException {
        stats.endPossession();
        ball.release(this);
        System.out.printf("[%s] %s released the ball%n", new Date(), name);
    }
    
    protected abstract void shoot() throws GameException;
    protected abstract void pass() throws GameException;
    protected abstract void dribble() throws GameException;
    protected abstract void defend() throws GameException;
    
    public PlayerStatistics getStatistics() { return stats; }
    public String getName() { return name; }
    public Team getTeam() { return team; }
    public boolean isActive() { return isActive; }
    public void deactivate() { isActive = false; }
}