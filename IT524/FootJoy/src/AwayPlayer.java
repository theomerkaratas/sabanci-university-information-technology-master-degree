import java.util.Date;

class AwayPlayer extends Player {
    public AwayPlayer(String name, Ball ball) {
        super(name, Team.AWAY, ball);
    }
    
    @Override
    public void play() throws GameException {
        if (!isActive) return;
        
        try {
            if (ball.isAvailable()) {
                acquireBall();
                Action action = chooseAction();
                executeAction(action);
                Thread.sleep((long)(Math.random() * 500) + 100);
                releaseBall();
            } else {
                Player holder = ball.getCurrentHolder();
                if (holder != null && holder.getTeam() == Team.HOME) {
                    trySteal(holder);
                }
            }
        } catch (BallAccessException e) {
            System.err.println("Ball access failed: " + e.getMessage());
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new GameException("Player interrupted");
        }
    }
    
    private void trySteal(Player opponent) {
        double stealChance = 0.2;
        if (Math.random() < stealChance) {
            System.out.printf("[%s] %s stole the ball from %s!%n", 
                    new Date(), name, opponent.getName());
        }
    }
    
    @Override
    protected void shoot() {
        System.out.printf("   %s shoots towards the goal!%n", name);
        if (Math.random() < 0.3) {
            System.out.println("   ⚽ GOAL! AWAY team scores!");
        } else {
            System.out.println("   Missed!");
        }
    }
    
    @Override
    protected void pass() {
        System.out.printf("   %s passes to a teammate%n", name);
    }
    
    @Override
    protected void dribble() {
        System.out.printf("   %s dribbles past a defender%n", name);
    }
    
    @Override
    protected void defend() {
        System.out.printf("   %s positions for defense%n", name);
    }
}