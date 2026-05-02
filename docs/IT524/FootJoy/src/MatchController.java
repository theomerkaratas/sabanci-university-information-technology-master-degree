import java.util.*;

class MatchController {
    private final List<Player> homePlayers;
    private final List<Player> awayPlayers;
    private final Ball ball;
    private final int matchDuration;
    private volatile boolean matchRunning;
    private final Object matchLock = new Object();
    
    public MatchController(int durationSeconds) {
        this.matchDuration = durationSeconds;
        this.ball = new Ball();
        this.homePlayers = new ArrayList<>();
        this.awayPlayers = new ArrayList<>();
        this.matchRunning = false;
        
        initializePlayers();
    }
    
    private void initializePlayers() {
        homePlayers.add(new HomePlayer("Home Player 1", ball));
        homePlayers.add(new HomePlayer("Home Player 2", ball));
        homePlayers.add(new HomePlayer("Home Player 3", ball));

        awayPlayers.add(new AwayPlayer("Away Player 1", ball));
        awayPlayers.add(new AwayPlayer("Away Player 2", ball));
        awayPlayers.add(new AwayPlayer("Away Player 3", ball));
    }
    
    public void startMatch() throws GameException {
        synchronized (matchLock) {
            if (matchRunning) {
                throw new GameException("Match is already running");
            }
            matchRunning = true;
        }
        
        System.out.println("=========================================");
        System.out.println("   HALI SAHA SIMULATOR - MATCH START");
        System.out.println("=========================================");
        
        long startTime = System.currentTimeMillis();
        long endTime = startTime + (matchDuration * 1000L);
        
        try {
            while (System.currentTimeMillis() < endTime && matchRunning) {
                playTurn();
                Thread.sleep(1000);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new GameException("Match interrupted");
        } finally {
            endMatch();
        }
    }
    
    private void playTurn() {
        int playersToAct = (int)(Math.random() * 3) + 2;
        
        for (int i = 0; i < playersToAct && matchRunning; i++) {
            try {
                List<Player> allPlayers = new ArrayList<>();
                allPlayers.addAll(homePlayers);
                allPlayers.addAll(awayPlayers);
                
                Player player = allPlayers.get((int)(Math.random() * allPlayers.size()));
                player.play();
            } catch (GameException e) {
                System.err.println("Error in player action: " + e.getMessage());
            }
        }
    }
    
    private void endMatch() {
        synchronized (matchLock) {
            matchRunning = false;
        }
        
        ball.takeOutOfPlay();

        homePlayers.forEach(Player::deactivate);
        awayPlayers.forEach(Player::deactivate);
        
        System.out.println("\n=========================================");
        System.out.println("           MATCH STATISTICS");
        System.out.println("=========================================");
        
        printStatistics();
    }
    
    private void printStatistics() {
        System.out.println("\nHOME TEAM STATISTICS:");
        System.out.println("---------------------");
        for (Player player : homePlayers) {
            PlayerStatistics stats = player.getStatistics();
            System.out.printf("%s: Touches: %d, Possession Time: %dms%n",
                    player.getName(), stats.getTouches(), stats.getTotalPossessionTime());
        }
        
        System.out.println("\nAWAY TEAM STATISTICS:");
        System.out.println("---------------------");
        for (Player player : awayPlayers) {
            PlayerStatistics stats = player.getStatistics();
            System.out.printf("%s: Touches: %d, Possession Time: %dms%n",
                    player.getName(), stats.getTouches(), stats.getTotalPossessionTime());
        }

        int homeTouches = homePlayers.stream()
                .mapToInt(p -> p.getStatistics().getTouches())
                .sum();
        long homePossession = homePlayers.stream()
                .mapToLong(p -> p.getStatistics().getTotalPossessionTime())
                .sum();
        
        int awayTouches = awayPlayers.stream()
                .mapToInt(p -> p.getStatistics().getTouches())
                .sum();
        long awayPossession = awayPlayers.stream()
                .mapToLong(p -> p.getStatistics().getTotalPossessionTime())
                .sum();
        
        System.out.println("\nTEAM TOTALS:");
        System.out.printf("HOME: Total Touches: %d, Total Possession: %dms (%.1f%%)%n",
                homeTouches, homePossession, 
                (homePossession + awayPossession > 0) ? 
                (homePossession * 100.0 / (homePossession + awayPossession)) : 0);
        System.out.printf("AWAY: Total Touches: %d, Total Possession: %dms (%.1f%%)%n",
                awayTouches, awayPossession,
                (homePossession + awayPossession > 0) ? 
                (awayPossession * 100.0 / (homePossession + awayPossession)) : 0);
    }
    
    public void stopMatch() {
        synchronized (matchLock) {
            matchRunning = false;
        }
    }
    
    public boolean isMatchRunning() {
        synchronized (matchLock) {
            return matchRunning;
        }
    }
}
